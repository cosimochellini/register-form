<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import RegistryStep from './components/RegistryStep.vue'
import CommunicationStep from './components/CommunicationStep.vue'
import PrivacyStep from './components/PrivacyStep.vue'
import ProgressStep from './components/ProgressStep.vue';
import { ref } from 'vue';

const currentStep = ref(0);
const steps = ['Registry', 'Communication', 'Privacy', 'Finish'];
</script>

<template>
    <div class="flex h-screen bg-gradient-to-t from-green-200 to-green-100">
        <div class="m-auto bg-white rounded-md shadow-sm _border-2 _border-green-500">
            <div class="px-5 my-5">
                <h1 class="text-3xl font-semibold text-gray-700">Register to our awesome website! 🌳</h1>
                <ProgressStep :current-step="currentStep" :steps="steps" />
                <RegistryStep class="step" />
                <CommunicationStep class="step" />
                <PrivacyStep class="step" />
            </div>
        </div>
    </div>
</template>

<style>
.step {
    @apply border-2 border-gray-300 my-3 rounded-md p-2;
}
</style>
