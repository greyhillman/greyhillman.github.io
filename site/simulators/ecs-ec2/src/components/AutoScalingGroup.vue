<script setup lang="ts">
import InstanceType from './InstanceType.vue';
import Capacity from './Capacity.vue';
import Alarm from './Alarm.vue';
import { useASG } from '../stores/AutoScalingGroup';

const store = useASG("asg");

</script>


<template>
    <fieldset id="asg">
        <legend>Auto-Scaling Group</legend>

        <InstanceType :id="store.template.instance.$id" />

        <output class="section">
            <p>Selected {{ store.template.instance.type }}</p>

            <dl>
                <dt>vCPU</dt>
                <dd>
                    <output>{{ store.template.instance.size.cpu }}</output>
                </dd>

                <dt>Memory (GB)</dt>
                <dd>
                    <output> {{ store.template.instance.size.memory }}</output>
                </dd>
            </dl>
        </output>

        <Capacity :id="store.capacity.$id" />

        <fieldset class="alarms">
            <legend>Alarms</legend>

            <ul>
                <li v-for="(alarm, index) in store.alarms.items" :key="alarm.$id">
                    <Alarm :id="alarm.$id" metric="cpu-reservation">
                        <template v-slot:metric_options>
                            <option value="cpu-reservation">CPU Reservation</option>
                            <option value="memory-reservation">Memory Reservation</option>
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

