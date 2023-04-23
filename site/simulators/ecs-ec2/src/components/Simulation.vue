<script setup lang="ts">
import { useASG } from '@/stores/AutoScalingGroup';
import { useControls } from '@/stores/Controls';
import { useService } from '@/stores/ECSService';
import { storeToRefs } from 'pinia';
import { Ref, ref, watch } from 'vue';
import Instance from './Instance.vue';
import InstanceContainer from './InstanceContainer.vue';

const asg = useASG("asg");
const ecs = useService("ecs");

</script>

<template>
    <output id="simulation">
        <header>Simulation</header>
        <dl>
            <dt>ASG Scaling cooldown</dt>
            <dd>{{ asg.cooldown }} seconds</dd>

            <dt>ECS Scaling cooldown</dt>
            <dd>{{ ecs.cooldown }} seconds</dd>
        </dl>
        <section>
            <ul class="instances">
                <li v-for="instance in asg.instances.items" :key="instance.$id">
                    <Instance :cpu="instance.size.cpu" :memory="instance.size.memory">
                        <ul class="containers">
                            <li v-for="container in instance.containers.items" :key="container.$id">
                                <InstanceContainer :cpu="container.cpu" :memory="container.memory" />
                            </li>
                        </ul>
                    </Instance>
                </li>
            </ul>
        </section>
    </output>
</template>
