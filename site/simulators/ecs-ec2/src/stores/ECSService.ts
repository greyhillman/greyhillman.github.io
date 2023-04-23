import { useList } from "@/stores/list";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlarm } from "./Alarm";
import { useCapacity } from "./Capacity";

interface Alarm {}

export function useService(id: string) {
    return defineStore(id, () => {
        const capacity = useCapacity(`${id}-capacity`);

        const cpu = ref(1024);
        const memory = ref(1024);

        const alarms = useList(`${id}-alarms`, (id) =>
            useAlarm(id, {
                metric: "cpu-utilization",
                condition: "lt",
                threshold: 50,
            })
        );

        return {
            capacity,
            container: {
                cpu,
                memory,
            },
            alarms,
            cooldown: ref(0),
        };
    })();
}
