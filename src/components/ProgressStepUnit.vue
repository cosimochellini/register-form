<template>
    <div class="flex-1">
        <div
            :class="circleClass"
            class="w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center"
            @click="$emit('stepClick', step)"
        >
            <span class="text-white text-center w-full">
                <i class="w-full fill-current white" :class="iconClass"></i>
            </span>
        </div>
    </div>

    <div
        class="w-1/6 align-center items-center align-middle content-center flex"
        v-if="!isLastStep"
    >
        <div class="w-full bg-green-200 rounded items-center align-middle align-center flex-1">
            <div
                class="bg-green-200 text-xs leading-none py-1 text-center text-gray-900 rounded w-full"
            ></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { classBindings } from '../types';

export default defineComponent({
    name: 'ProgressStep',
    emits: {
        stepClick(step: number) {
            return step !== null;
        }
    },
    props: {
        step: {
            type: Number,
            required: true,
        },
        currentStep: {
            type: Number,
            required: true,
        },
        isLastStep: {
            type: Boolean,
            required: true,
        },
    },

    computed: {
        circleClass(): classBindings {
            return {
                'bg-green-200': this.step > this.currentStep,
                'bg-green-400': this.step === this.currentStep,
                'bg-green-600': this.step < this.currentStep,
                'cursor-pointer': this.step < this.currentStep,
                'opacity-50': this.step > this.currentStep,
            }
        },
        iconClass(): classBindings {
            return {
                'fas fa-ellipsis-h': this.step > this.currentStep,
                'fas fa-keyboard': this.step === this.currentStep,
                'fa fa-check': this.step < this.currentStep,
            }
        }
    }
})

</script>
