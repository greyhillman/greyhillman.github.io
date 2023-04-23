import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export function useScalingPolicy(id: string) {
    return defineStore(id, () => {
        const action: Ref<"add" | "remove"> = ref("add");
        const units = ref(1);

        const cooldown = ref(120);

        return {
            action,
            units,
            cooldown,
        };
    })();
}
