<template>
    <div class="md:flex min-h-screen bg-gradient-to-t from-green-200 to-green-100">
        <div class="m-auto bg-white rounded-md shadow-sm">
            <div class="px-5 my-5">
                <h1
                    class="text-3xl font-semibold text-gray-700 text-center"
                >Register to our awesome website! 🌳</h1>
                <ProgressStep
                    :steps="steps"
                    :current-step="currentStep"
                    @stepClick="s => currentStep = s"
                />
                <div class="form-outer" v-show="currentStep < 3">
                    <div class="form-inner">
                        <RegistryStep
                            class="step page"
                            @submit="onRegistrySubmit"
                            :active="currentStep === 0"
                            :class="firstStepClasses()"
                        />

                        <ContactStep
                            class="step page"
                            @submit="onContactSubmit"
                            :active="currentStep === 1"
                            :class="currentStep === 1 ? 'active' : ''"
                        />

                        <PrivacyStep
                            class="step page"
                            @submit="onPrivacySubmit"
                            :active="currentStep === 2"
                            :class="currentStep === 2 ? 'active' : ''"
                        />
                    </div>
                </div>
                <div v-show="currentStep >= 3" class="py-6 text-center">
                    <FinalStep :payload="payload" />
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import PrivacyStep from './components/PrivacyStep.vue'
import ContactStep from './components/ContactStep.vue'
import RegistryStep from './components/RegistryStep.vue'
import ProgressStep from './components/ProgressStep.vue';
import { contact, privacy, registrationPayload, registry } from './types/registration';
import FinalStep from './components/FinalStep.vue';

const currentStep = ref(3);

const payload = ref<registrationPayload>({
    registry: { name: '', surname: '', birthDate: '' },
    contact: { email: '', phone: '' },
    privacy: { privacy: false, marketing: false },
});

const steps = ['Registry', 'Contact', 'Privacy', 'Finish'];

const onRegistrySubmit = (data: registry) => {
    currentStep.value = 1;
    payload.value.registry = data;
}

const onContactSubmit = (data: contact) => {
    currentStep.value = 2;
    payload.value.contact = data;
}

const onPrivacySubmit = (data: privacy) => {
    currentStep.value = 3;
    payload.value.privacy = data;
}

const firstStepClasses = () => {

    return {
        'active': currentStep.value === 0,
        [`-m-${currentStep.value * 33}`]: true, //-m-0 -m-33 -m-66 -m-99
    }
}

</script>


<style scoped>
.step {
    @apply md:border-2 border-gray-300 my-3 rounded-md p-2 md:!m-2;
}

.step.active {
    @apply border-green-500;
}

@media screen and (max-width: 640px) {
    .form-outer {
        width: 100%;
        overflow: hidden;
    }

    .form-inner {
        display: flex;
        width: 300%;
    }

    .page {
        width: 33.333%;
        transition: margin-left 0.3s ease-in-out;
    }
}
</style>
