<script setup lang="ts">
import { useAlarm } from '../stores/Alarm';
import ScalingPolicy from './ScalingPolicy.vue';

const props = defineProps<{
    id: string,
    metric: string,
}>();

const store = useAlarm(props.id, {
    metric: props.metric,
    condition: "lt",
    threshold: 50,
});

</script>

<template>
    <fieldset class="alarm">
        <legend>Alarm</legend>

        <select v-model="store.metric">
            <slot name="metric_options"></slot>
        </select>

        <select class="operator" v-model="store.condition">
            <option value="lt">&lt;</option>
            <option value="lteq">&lt;=</option>
            <option value="gt">&gt;</option>
            <option value="gteq">&gt;=</option>
        </select>

        <input type="number" min="0" max="100" v-model="store.threshold" />

        <ScalingPolicy :id="store.policy.$id" />
    </fieldset>
</template>
