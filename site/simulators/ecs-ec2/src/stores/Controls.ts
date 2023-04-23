import { defineStore } from "pinia";
import { computed, Ref, ref, watch } from "vue";
import { useASG } from "./AutoScalingGroup";
import { useService } from "./ECSService";

export function useControls(id: string) {
    return defineStore(id, () => {
        const asg = useASG("asg");
        const ecs = useService("ecs");

        const cpu_utilization = ref(0);
        const memory_utilization = ref(0);

        const playing = ref(false);
        const fps = ref(15);

        const simulationTickId: Ref<number | undefined> = ref();

        const tickWatch = watch([playing, fps], ([is_playing, fps]) => {
            clearInterval(simulationTickId.value);

            if (!is_playing) {
                return;
            }

            simulationTickId.value = setInterval(() => {
                const asg_diff = asg.capacity.desired - asg.instances.length;
                if (asg_diff > 0) {
                    for (let i = 0; i < asg_diff; i++) {
                        asg.instances.add();
                    }
                } else if (asg_diff < 0) {
                    for (let i = 0; i < -asg_diff; i++) {
                        asg.instances.remove(0);
                    }
                }

                const containers = [];
                for (const instance of asg.instances.items) {
                    for (const container of instance.containers.items) {
                        containers.push(container);
                    }
                }

                const container_diff = ecs.capacity.desired - containers.length;
                if (container_diff > 0) {
                    for (let i = 0; i < container_diff; i++) {
                        let available_instance = null;
                        for (const instance of asg.instances.items) {
                            if (
                                instance.available.cpu >= ecs.container.cpu &&
                                instance.available.memory >=
                                    ecs.container.memory
                            ) {
                                available_instance = instance;
                                break;
                            }
                        }

                        if (!available_instance) {
                            console.log(
                                "Failed to find instance with available space."
                            );
                            break;
                        }

                        available_instance.containers.add();
                    }
                } else if (container_diff < 0) {
                    for (let i = 0; i < -container_diff; i++) {
                        let removed_container = false;
                        for (const instance of asg.instances.items) {
                            if (instance.containers.length > 0) {
                                instance.containers.remove(0);

                                removed_container = true;
                                break;
                            }
                        }

                        if (!removed_container) {
                            console.log("Failed to find container to remove.");
                        }
                    }
                }

                const total_reserved = {
                    cpu: 0,
                    memory: 0,
                };
                const current_reserved = {
                    cpu: 0,
                    memory: 0,
                };
                for (const instance of asg.instances.items) {
                    total_reserved.cpu += instance.size.cpu * 1024;
                    total_reserved.memory += instance.size.memory * 1024;

                    for (const container of instance.containers.items) {
                        current_reserved.cpu += container.cpu;
                        current_reserved.memory += container.memory;
                    }
                }

                const reserved = {
                    cpu: (current_reserved.cpu / total_reserved.cpu) * 100,
                    memory:
                        (current_reserved.memory / total_reserved.memory) * 100,
                };

                if (asg.cooldown > 0) {
                    asg.cooldown--;
                }

                if (asg.cooldown <= 0) {
                    for (const alarm of asg.alarms.items) {
                        if (
                            alarm.metric === "cpu-reservation" &&
                            alarm.active(reserved.cpu)
                        ) {
                            if (alarm.policy.action === "add") {
                                asg.capacity.desired += alarm.policy.units;
                            } else if (alarm.policy.action === "remove") {
                                asg.capacity.desired -= alarm.policy.units;
                            }

                            asg.cooldown = alarm.policy.cooldown;
                            break;
                        } else if (
                            alarm.metric === "memory-reservation" &&
                            alarm.active(reserved.memory)
                        ) {
                            if (alarm.policy.action === "add") {
                                asg.capacity.desired += alarm.policy.units;
                            } else if (alarm.policy.action === "remove") {
                                asg.capacity.desired -= alarm.policy.units;
                            }

                            asg.cooldown = alarm.policy.cooldown;
                            break;
                        }
                    }
                }

                if (ecs.cooldown > 0) {
                    ecs.cooldown--;
                }

                const utilization = {
                    cpu: cpu_utilization.value / containers.length,
                    memory: memory_utilization.value / containers.length,
                };

                if (ecs.cooldown <= 0) {
                    for (const alarm of ecs.alarms.items) {
                        if (
                            alarm.metric === "cpu-utilization" &&
                            alarm.active(utilization.cpu)
                        ) {
                            if (alarm.policy.action === "add") {
                                ecs.capacity.desired += alarm.policy.units;
                            } else if (alarm.policy.action === "remove") {
                                ecs.capacity.desired -= alarm.policy.units;
                            }

                            ecs.cooldown = alarm.policy.cooldown;
                            break;
                        } else if (
                            alarm.metric === "memory-utilization" &&
                            alarm.active(utilization.memory)
                        ) {
                            if (alarm.policy.action === "add") {
                                ecs.capacity.desired += alarm.policy.units;
                            } else if (alarm.policy.action === "remove") {
                                ecs.capacity.desired -= alarm.policy.units;
                            }

                            ecs.cooldown = alarm.policy.cooldown;
                            break;
                        }
                    }
                }

                console.log("tick");
            }, (1 / fps) * 1000);
        });

        return {
            cpu: {
                value: cpu_utilization,
                max: computed(() => {
                    return ecs.capacity.max * 100;
                }),
            },
            memory: {
                value: memory_utilization,
                max: computed(() => {
                    return ecs.capacity.max * 100;
                }),
            },
            simulationTickId,
            tickWatch,
            fps,
            playing,
            restart: () => {
                ecs.cooldown = 0;
                asg.cooldown = 0;

                asg.capacity.desired = 0;
                ecs.capacity.desired = 0;

                while (asg.instances.length > 0) {
                    asg.instances.remove(0);
                }
            },
            pause: () => {
                playing.value = false;
            },
            play: () => {
                playing.value = true;
            },
        };
    })();
}
