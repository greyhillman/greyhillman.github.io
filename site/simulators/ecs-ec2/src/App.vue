<script setup lang="ts">
import AutoScalingGroup from './components/AutoScalingGroup.vue';
import ECSService from './components/ECSService.vue';

import Controls from './components/Controls.vue';
import Simulation from './components/Simulation.vue';

</script>

<template>
    <AutoScalingGroup />
    <ECSService />
    <Controls />
    <Simulation />
</template>

<style lang="scss" src="./assets/index.scss"></style>
