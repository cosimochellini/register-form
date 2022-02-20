<template>
    <div class="max-w-xl mx-auto my-4 border-b-2 pb-4">
        <div class="flex pb-3">
            <div class="flex-1"></div>
            <ProgressStepUnit
                v-for="(step, index) in steps"
                :key="step"
                :step="index"
                :current-step="currentStep"
                :is-last-step="index == steps.length - 1"
                @stepClick="handleStepClick"
            />

            <div class="flex-1"></div>
        </div>

        <div class="flex text-xs text-center">
            <div class="w-1/4" v-for="step in steps">{{ step }}</div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ProgressStepUnit from './ProgressStepUnit.vue';

export default defineComponent({
    emits: {
        stepClick(step: number) {
            return step !== null;
        }
    },
    props: {
        currentStep: {
            type: Number,
            required: true,
        },
        steps: {
            type: Array as PropType<string[]>,
            required: true,
        },
    },
    components: {
        ProgressStepUnit,
    },
    methods: {
        handleStepClick(step: number) {
            if (this.currentStep > step) {
                this.$emit('stepClick', step);
            }
        }
    }
})
</script>
