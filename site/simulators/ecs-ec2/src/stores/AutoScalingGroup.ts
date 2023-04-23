import { useList } from "@/stores/list";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlarm } from "./Alarm";
import { useCapacity } from "./Capacity";
import { useClusterInstance } from "./ClusterInstance";
import { useInstanceTypeSelect } from "./InstanceTypeSelect";

export function useASG(id: string) {
    return defineStore(id, () => {
        const capacity = useCapacity(`${id}-capacity`);
        const instance = useInstanceTypeSelect(`${id}-template-instance`);

        const alarms = useList(`${id}-alarms`, (id) =>
            useAlarm(id, {
                condition: "lt",
                metric: "cpu-reservation",
                threshold: 50,
            })
        );

        const cooldown = ref(0);

        const instances = useList(`${id}-instances`, (id) =>
            useClusterInstance(id, {
                type: instance.type,
                size: instance.size,
            })
        );

        return {
            capacity,
            template: {
                instance,
            },
            alarms,
            cooldown,
            instances,
        };
    })();
}
