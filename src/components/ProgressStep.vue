<template>
    <div class="max-w-xl mx-auto my-4 border-b-2 pb-4">
        <div class="flex pb-3">
            <div class="flex-1"></div>

            <div class="flex-1">
                <div
                    class="w-10 h-10 bg-green-500 mx-auto rounded-full text-lg text-white flex items-center"
                >
                    <span class="text-white text-center w-full">
                        <i class="fa fa-check w-full fill-current white"></i>
                    </span>
                </div>
            </div>

            <div class="w-1/6 align-center items-center align-middle content-center flex">
                <div
                    class="w-full bg-green-200 rounded items-center align-middle align-center flex-1"
                >
                    <div
                        class="bg-green-200 text-xs leading-none py-1 text-center text-gray-900 rounded"
                        style="width: 100%"
                    ></div>
                </div>
            </div>

            <div class="flex-1">
                <div
                    class="w-10 h-10 bg-green-500 mx-auto rounded-full text-lg text-white flex items-center"
                >
                    <span class="text-white text-center w-full">
                        <i class="fa fa-check w-full fill-current white"></i>
                    </span>
                </div>
            </div>

            <div class="w-1/6 align-center items-center align-middle content-center flex">
                <div
                    class="w-full bg-green-200 rounded items-center align-middle align-center flex-1"
                >
                    <div
                        class="bg-green-200 text-xs leading-none py-1 text-center text-gray-900 rounded"
                        style="width: 20%"
                    ></div>
                </div>
            </div>

            <div class="flex-1">
                <div
                    class="w-10 h-10 bg-white border-2 border-gray-200 mx-auto rounded-full text-lg text-white flex items-center"
                >
                    <span class="text-gray-800 text-center w-full">3</span>
                </div>
            </div>

            <div class="w-1/6 align-center items-center align-middle content-center flex">
                <div
                    class="w-full bg-green-200 rounded items-center align-middle align-center flex-1"
                >
                    <div
                        class="bg-green-200 text-xs leading-none py-1 text-center text-gray-900 rounded"
                        style="width: 0%"
                    ></div>
                </div>
            </div>

            <div class="flex-1">
                <div
                    class="w-10 h-10 bg-white border-2 border-gray-200 mx-auto rounded-full text-lg text-white flex items-center"
                >
                    <span class="text-gray-800 text-center w-full">4</span>
                </div>
            </div>

            <div class="flex-1"></div>
        </div>

        <div class="flex text-xs justify-between text-center">
            <div class="w-1/4" v-for="step in steps">{{ step }}</div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    props: {
        currentStep: {
            type: Number,
            required: true,
        },
        steps: {
            type: Array as PropType<string[]>,
            required: true,
        },
    }
})
</script>
