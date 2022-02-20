<template>
    <div class="sm:flex min-h-screen bg-gradient-to-t from-green-200 to-green-100">
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
                            class="step"
                            @submit="onRegistrySubmit"
                            :class="firstStepClasses()"
                            :active="currentStep === Steps.Registry"
                        />

                        <ContactStep
                            class="step"
                            @submit="onContactSubmit"
                            :active="currentStep === Steps.Contact"
                            :class="currentStep === Steps.Contact ? 'active' : ''"
                        />

                        <PrivacyStep
                            class="step"
                            @submit="onPrivacySubmit"
                            :active="currentStep === Steps.Privacy"
                            :class="currentStep === Steps.Privacy ? 'active' : ''"
                        />
                    </div>
                </div>
                <div v-if="currentStep >= 3" class="py-6 text-center">
                    <FinalStep :payload="payload" @success="currentStep = Steps.Finish" />
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { Steps } from './types';
import FinalStep from './components/FinalStep.vue';
import PrivacyStep from './components/PrivacyStep.vue'
import ContactStep from './components/ContactStep.vue'
import RegistryStep from './components/RegistryStep.vue'
import ProgressStep from './components/ProgressStep.vue';
import { contact, privacy, registrationPayload, registry } from './types/registration';

const currentStep = ref(Steps.Registry);

const payload = ref<registrationPayload>({
    registry: { name: '', surname: '', birthDate: '' },
    contact: { email: '', phone: '' },
    privacy: { privacy: false, marketing: false },
});

const steps = ['Registry', 'Contact', 'Privacy', 'Finish'];

const onRegistrySubmit = (data: registry) => {
    currentStep.value = Steps.Contact;
    payload.value.registry = data;
}

const onContactSubmit = (data: contact) => {
    currentStep.value = Steps.Privacy;
    payload.value.contact = data;
}

const onPrivacySubmit = (data: privacy) => {
    currentStep.value = Steps.Finish;
    payload.value.privacy = data;
}

const firstStepClasses = () => {

    return {
        'active': currentStep.value === Steps.Registry,
        [`-m-${currentStep.value * 33}`]: true, //-m-0 -m-33 -m-66 -m-99
    }
}

</script>


<style scoped>
.step {
    @apply sm:border-2 border-gray-300 my-3 rounded-md p-2 sm:!m-2;
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

    .step {
        width: 33.333%;
        transition: margin-left 0.3s ease-in-out;
    }
}
</style>
