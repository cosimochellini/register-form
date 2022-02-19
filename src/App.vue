<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue';
import PrivacyStep from './components/PrivacyStep.vue'
import RegistryStep from './components/RegistryStep.vue'
import ProgressStep from './components/ProgressStep.vue';
import CommunicationStep from './components/CommunicationStep.vue'
import { communication, privacy, registrationPayload, registry } from './types/registration';

const currentStep = ref(0);

const payload = ref<registrationPayload>({
    registry: { name: '', surname: '', birthDate: '' },
    communication: { email: '', phone: '' },
    privacy: { privacy: false, marketing: false },
});

const steps = ['Registry', 'Communication', 'Privacy', 'Finish'];

const onRegistrySubmit = (data: registry) => {
    currentStep.value = 1;
    payload.value.registry = data;
}

const onCommunicationSubmit = (data: communication) => {
    currentStep.value = 2;
    payload.value.communication = data;
}

const onPrivacySubmit = (data: privacy) => {
    currentStep.value = 3;
    payload.value.privacy = data;
}

</script>

<template>
    <div class="flex h-screen bg-gradient-to-t from-green-200 to-green-100">
        <div class="m-auto bg-white rounded-md shadow-sm">
            <div class="px-5 my-5">
                <h1 class="text-3xl font-semibold text-gray-700">Register to our awesome website! 🌳</h1>
                <ProgressStep :current-step="currentStep" :steps="steps" />

                <RegistryStep
                    class="step"
                    @submit="onRegistrySubmit"
                    :class="currentStep === 0 ? 'active' : ''"
                    :active="currentStep === 0"
                />

                <CommunicationStep
                    class="step"
                    :active="currentStep === 1"
                    @submit="onCommunicationSubmit"
                    :class="currentStep === 1 ? 'active' : ''"
                />

                <PrivacyStep
                    class="step"
                    @submit="onPrivacySubmit"
                    :active="currentStep === 2"
                    :class="currentStep === 2 ? 'active' : ''"
                />
            </div>
        </div>
    </div>
</template>

<style>
.step {
    @apply border-2 border-gray-300 my-3 rounded-md p-2;
}

.step.active {
    @apply border-green-500;
}
</style>
