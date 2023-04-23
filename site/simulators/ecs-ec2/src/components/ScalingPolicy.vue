<script setup lang="ts">
import { useScalingPolicy } from '../stores/ScalingPolicy';

const props = defineProps<{
    id: string;
}>();

const store = useScalingPolicy(props.id);
</script>

<template>
    <fieldset>
        <legend>Scaling Policy</legend>

        <select v-model="store.action">
            <option value="add">Add</option>
            <option value="remove">Remove</option>
        </select>

        <input type="number" min="1" v-model="store.units" />
        <label for="units">
            Units
        </label>

        <label for="cooldown">
            Scaling cooldown (seconds)
        </label>
        <input type="number" min="0" v-model="store.cooldown" />
    </fieldset>
</template>

