<script setup lang="ts">
defineProps<{
    cpu: number;
    memory: number;
}>();
</script>

<template>
    <dl class="container">
        <dt>CPU</dt>
        <dd>{{ cpu }}</dd>

        <dt>Memory</dt>
        <dd>{{ memory }}</dd>
    </dl>
</template>
