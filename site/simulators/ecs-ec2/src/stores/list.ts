import { defineStore, Store } from "pinia";
import { computed, Ref, ref } from "vue";

export interface Item<T> {
    value: T;
    key: string;
}

export function useList<S extends Store>(
    id: string,
    useItem: (id: string) => S
) {
    return defineStore(id, () => {
        const ids: Ref<string[]> = ref([]);

        return {
            items: computed(() => {
                return ids.value.map((item_id) => useItem(item_id));
            }),
            length: computed(() => ids.value.length),
            add: () => {
                ids.value.push(`${id}-${Math.random().toString()}`);
            },
            remove: (index: number) => {
                ids.value.splice(index, 1);
            },
        };
    })();
}
