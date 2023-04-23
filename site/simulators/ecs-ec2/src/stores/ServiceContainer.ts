import { defineStore } from "pinia";
import { ref } from "vue";
import { useService } from "./ECSService";

export function useContainer(id: string) {
    return defineStore(id, () => {
        const service = useService("ecs");

        const cpu = ref(service.container.cpu);
        const memory = ref(service.container.memory);

        return {
            cpu,
            memory,
        };
    })();
}
