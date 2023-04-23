import { defineStore } from "pinia";
import { computed, ref } from "vue";

export function useCapacity(id: string) {
    return defineStore(id, () => {
        const min = ref(1);
        const desired = ref(1);
        const max = ref(10);

        return {
            min,
            max,
            desired: computed({
                get: () => {
                    desired.value = Math.max(desired.value, min.value);
                    desired.value = Math.min(desired.value, max.value);

                    return desired.value;
                },
                set: (x: number) => {
                    desired.value = x;
                },
            }),
        };
    })();
}
