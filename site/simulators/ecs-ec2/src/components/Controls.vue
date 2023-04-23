<script setup lang="ts">
import { useControls } from '../stores/Controls';

const store = useControls("controls");
</script>

<template>
    <fieldset id="controls">
        <legend>Simulation</legend>

        <fieldset class="utilization">
            <legend>Total Containers</legend>

            <label for="cpu">
                CPU Utilization
            </label>
            <input name="cpu" type="range" step="10" min="0" v-bind:max="store.cpu.max" v-model="store.cpu.value" />
            <output>{{ store.cpu.value }}</output>

            <label for="memory">
                Memory Utilization
            </label>
            <input name="memory" type="range" step="10" min="0" v-bind:max="store.memory.max"
                v-model="store.memory.value" />
            <output>{{ store.memory.value }}</output>
        </fieldset>

        <fieldset>
            <legend>Time</legend>

            <p>1 Tick = 1 second</p>

            <label for="ticks_per_second">Ticks per second</label>
            <input name="ticks_per_second" type="range" min="1" max="60" v-model="store.fps" />
            <output>{{ store.fps }}</output>

            <menu class="time">
                <li>
                    <button @click="store.restart()">Restart</button>
                </li>
                <li>
                    <button v-if="store.playing" @click="store.pause()">
                        Pause
                    </button>
                    <button v-else @click="store.play()">
                        Play
                    </button>
                </li>
            </menu>
        </fieldset>
    </fieldset>
</template>
