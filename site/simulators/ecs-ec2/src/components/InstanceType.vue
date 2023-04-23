<script setup lang="ts">
import { useInstanceTypeSelect } from '../stores/InstanceTypeSelect';

const props = defineProps<{
    id: string;
}>();

const store = useInstanceTypeSelect(props.id);
</script>

<template>
    <label for="instance-type">Instance Type</label>
    <select name="instance-type" v-model="store.type">
        <optgroup label="t2">
            <option value="t2.micro">t2.micro</option>
            <option value="t2.small">t2.small</option>
            <option value="t2.medium">t2.medium</option>
            <option value="t2.large">t2.large</option>
            <option value="t2.xlarge">t2.xlarge</option>
            <option value="t2.2xlarge">t2.2xlarge</option>
        </optgroup>
        <optgroup label="t3">
            <option>t3.small</option>
            <option>t3.large</option>
            <option>t3.xlarge</option>
        </optgroup>
    </select>
</template>
