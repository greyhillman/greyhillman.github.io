import { defineStore } from "pinia";
import { computed, Ref, ref } from "vue";

export type InstanceTypeId = keyof typeof INSTANCE_SIZES;

export interface InstanceSize {
    cpu: number;
    memory: number;
}

export const INSTANCE_SIZES = {
    "t2.micro": {
        cpu: 1,
        memory: 1,
    },
    "t2.small": {
        cpu: 1,
        memory: 2,
    },
    "t2.medium": {
        cpu: 2,
        memory: 4,
    },
    "t2.large": {
        cpu: 2,
        memory: 8,
    },
    "t2.xlarge": {
        cpu: 4,
        memory: 16,
    },
    "t2.2xlarge": {
        cpu: 8,
        memory: 32,
    },
};

export function useInstanceTypeSelect(id: string) {
    return defineStore(id, () => {
        const type: Ref<InstanceTypeId> = ref("t2.micro");

        return {
            type,
            size: computed(() => {
                return INSTANCE_SIZES[type.value];
            }),
        };
    })();
}
