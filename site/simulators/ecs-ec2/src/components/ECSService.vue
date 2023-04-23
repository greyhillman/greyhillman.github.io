<script setup lang="ts">
import Alarm from './Alarm.vue';
import Capacity from './Capacity.vue';
import { useService } from '../stores/ECSService';

const store = useService("ecs");
</script>

<template>
    <fieldset id="ecs">
        <legend>ECS Service</legend>

        <Capacity :id="store.capacity.$id" />

        <fieldset>
            <legend>Container</legend>

            <label for="container_cpu">
                vCPU units
            </label>
            <input name="container_cpu" type="number" min="128" step="128" v-model="store.container.cpu" />

            <label for="container_memory">
                Memory units
            </label>
            <input name="container_memory" type="number" min="128" step="128" v-model="store.container.memory" />
        </fieldset>

        <fieldset class="alarms">
            <legend>Alarms</legend>

            <ul>
                <li v-for="(item, index) in store.alarms.items" :key="item.$id">
                    <Alarm metric="cpu-utilization" :id="item.$id">
                        <template v-slot:metric_options>
                            <option value="cpu-utilization">CPU Utilization</option>
                            <option value="memory-utilization">Memory Utilization</option>
                        </template>
                    </Alarm>
                    <button @click="store.alarms.remove(index)">Remove</button>
                </li>
                <li>
                    <button @click="store.alarms.add()">Add</button>
                </li>
            </ul>
        </fieldset>
    </fieldset>
</template>

