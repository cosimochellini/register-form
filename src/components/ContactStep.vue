<template>
    <form @submit.prevent="handleSubmit">
        <h1 class="my-3 text-2xl font-semibold text-gray-700">Your contact information</h1>
        <p
            class="text-gray-400"
        >Fill up your contact information so that we can contact you in case of need.</p>

        <BaseInput
            ref="email"
            name="email"
            type="email"
            placeholder="mario.rossi@gmail.com"
            v-model="form.email"
            :rules="emailValidation"
            :readonly="!active"
        />

        <BaseInput
            type="tel"
            ref="phone"
            name="phone"
            placeholder="3491234567"
            v-model="form.phone"
            :rules="phoneValidation"
            :readonly="!active"
        />

        <Alert v-bind="backendError" v-if="apiError" type="error" class="my-3" />

        <BaseButton
            type="submit"
            :loading="loading"
            class="mt-3 button-green"
            :disabled="!form.isValid || !active"
            @click="handleSubmit"
        >Next</BaseButton>
    </form>
</template>

<script lang="ts">
import Alert from './Alert.vue';
import { defineComponent } from 'vue'
import BaseInput from './Input/BaseInput.vue';
import BaseButton from './Input/BaseButton.vue';
import { backendError } from '../shared/messages';
import { useValidation } from '../composables/useValidation';
import { registerService } from '../services/registerService';
import { emailValidation, phoneValidation } from '../validations/rules';

export default defineComponent({
    components: { BaseInput, BaseButton, Alert },
    props: {
        active: { type: Boolean, required: true },
    },
    emits: ['submit'],
    setup() {
        const { triggerValidation, form } = useValidation({ email: "", phone: "" })

        return { emailValidation, phoneValidation, triggerValidation, form, backendError }
    },
    data() {
        return {
            loading: false,
            apiError: false,
        }
    },
    methods: {
        async handleSubmit() {
            this.triggerValidation()

            const { isValid, ...formData } = this.form;

            if (!isValid) return;

            this.loading = true;
            this.apiError = false;

            try {
                const isValid = await registerService.validateContact(formData);

                if (!isValid) {
                    this.apiError = true;
                } else {
                    this.apiError = false;
                    this.$emit('submit', formData);
                }
            } catch (error) {
                console.error(error);
                this.apiError = true;
            } finally {
                this.loading = false;
            }
        },
    },
})

</script>
