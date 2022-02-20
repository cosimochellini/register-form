<template>
    <div class="border-t-4 rounded-b px-4 py-3 shadow-md" :class="alertClass" role="alert">
        <div class="flex">
            <div class="py-1">
                <svg
                    :class="svgClass"
                    viewBox="0 0 20 20"
                    class="fill-current h-6 w-6 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path :d="svgPath" />
                </svg>
            </div>
            <div>
                <p class="font-bold">{{ title }}</p>
                <p class="text-sm">{{ description }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        type: {
            type: String as PropType<'success' | 'warning' | 'error' | 'info'>,
            required: true,
        }
    },
    computed: {
        alertClass() {
            switch (this.type) {
                case 'success':
                    return 'bg-green-100 border-green-500 text-green-900'
                case 'warning':
                    return 'bg-orange-100 border-orange-500 text-orange-900'
                case 'error':
                    return 'bg-red-100 border-red-500 text-red-900'
                case 'info':
                default:
                    return 'bg-blue-100 border-blue-500 text-blue-900'
            }
        },
        svgClass() {
            switch (this.type) {
                case 'success':
                    return 'text-green-500'
                case 'warning':
                    return 'text-orange-500'
                case 'error':
                    return 'text-red-500'
                case 'info':
                default:
                    return 'text-blue-500'
            }
        },
        svgPath() {
            switch (this.type) {
                case 'success':
                    return 'M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z';
                case 'warning':
                case 'error':
                    return 'm194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0';
                case 'info':
                default:
                    return 'M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z';
            }
        }
    }
})

</script>
