import { defineStore } from "pinia";
import { ref } from "vue";
import { useScalingPolicy } from "./ScalingPolicy";

type Condition = "lt" | "lteq" | "gt" | "gteq";

export interface Init {
    metric: string;
    condition: Condition;
    threshold: number;
}

export function useAlarm(id: string, init: Init) {
    return defineStore(id, () => {
        const metric = ref(init.metric);
        const condition = ref(init.condition);
        const threshold = ref(init.threshold);

        const policy = useScalingPolicy(`${id}-policy`);

        return {
            metric,
            condition,
            threshold,
            active: (x: number) => {
                switch (condition.value) {
                    case "lt":
                        return x < threshold.value;
                    case "lteq":
                        return x <= threshold.value;
                    case "gt":
                        return x > threshold.value;
                    case "gteq":
                        return x >= threshold.value;
                }
            },
            policy,
        };
    })();
}
