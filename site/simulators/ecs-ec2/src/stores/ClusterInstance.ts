import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { InstanceSize, InstanceTypeId } from "./InstanceTypeSelect";
import { useList } from "./list";
import { useContainer } from "./ServiceContainer";

export interface Init {
    type: InstanceTypeId;
    size: InstanceSize;
}

export function useClusterInstance(id: string, init: Init) {
    return defineStore(id, () => {
        const type = ref(init.type);
        const size = ref(init.size);

        const containers = useList(`${id}-containers`, (id) =>
            useContainer(id)
        );

        const reserved_cpu = computed(() => {
            let reserved = 0;
            for (const container of containers.items) {
                reserved += container.cpu;
            }

            return reserved;
        });
        const reserved_memory = computed(() => {
            let reserved = 0;
            for (const container of containers.items) {
                reserved += container.memory;
            }

            return reserved;
        });

        return {
            type,
            size,
            containers,
            reserved: {
                cpu: reserved_cpu,
                memory: reserved_memory,
            },
            available: {
                cpu: computed(() => {
                    return size.value.cpu * 1024 - reserved_cpu.value;
                }),
                memory: computed(() => {
                    return size.value.memory * 1024 - reserved_memory.value;
                }),
            },
        };
    })();
}
