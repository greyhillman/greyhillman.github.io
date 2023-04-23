<script setup lang="ts">
import { useCapacity } from '../stores/Capacity';

const props = defineProps<{
    id: string;
}>();

const store = useCapacity(props.id);

</script>

<template>
    <fieldset class="capacity">
        <legend>Capacity</legend>

        <label for="min">
            Minimum
        </label>
        <input name="min" type="number" min="1" max="20" v-model="store.min" />
        <input name="min" type="range" min="1" max="20" v-model="store.min" />

        <label for="desired">
            Desired
        </label>
        <input name="desired" type="number" min="1" max="20" v-model="store.desired" />
        <input name="desired" type="range" min="1" max="20" v-model="store.desired" />

        <label for="max">
            Maximum
        </label>
        <input name="max" type="number" min="1" max="20" v-model="store.max" />
        <input name="max" type="range" min="1" max="20" v-model="store.max" />
    </fieldset>
</template>
