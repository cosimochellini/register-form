<template>
    <form @submit.prevent="handleSubmit">
        <h1 class="my-3 text-2xl font-semibold text-gray-700">Your registry information</h1>
        <p
            class="text-gray-400 max-w-sm"
        >Enter your personal data to be able to verify your identity.</p>

        <BaseInput
            ref="name"
            name="name"
            type="text"
            placeholder="mario"
            v-model="form.name"
            :rules="nameValidation"
            :readonly="!active"
        />

        <BaseInput
            type="text"
            ref="surname"
            name="surname"
            placeholder="rossi"
            v-model="form.surname"
            :rules="surnameValidation"
            :readonly="!active"
        />

        <BaseInput
            type="date"
            ref="birthDate"
            name="birthDate"
            placeholder="dd/mm/yyyy"
            :min="minBirthDate"
            :max="maxBirthDate"
            v-model="form.birthDate"
            :rules="birthDateValidation"
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
import { pastYearsAgo } from '../utils/date';
import BaseInput from './Input/BaseInput.vue';
import BaseButton from './Input/BaseButton.vue';
import { backendError } from '../shared/messages';
import { useValidation } from '../composables/useValidation';
import { registerService } from '../services/registerService';
import { nameValidation, surnameValidation, birthDateValidation } from '../validations/rules';

export default defineComponent({
    components: { BaseInput, BaseButton, Alert },
    emits: ['submit'],
    props: {
        active: { type: Boolean, required: true },
    },
    setup() {
        const { triggerValidation, form } = useValidation({ name: "", surname: "", birthDate: "" })

        return { nameValidation, surnameValidation, birthDateValidation, triggerValidation, form, backendError }
    },
    data() {
        return {
            loading: false,
            apiError: false,
            maxBirthDate: pastYearsAgo(18).toISOString().substring(0, 10),
            minBirthDate: pastYearsAgo(100).toISOString().substring(0, 10),
        }
    },
    methods: {
        async handleSubmit() {
            this.triggerValidation(true)

            const { isValid, ...formData } = this.form;

            if (!isValid) return;

            this.loading = true;
            this.apiError = false;

            try {
                const isValid = await registerService.validateRegistry(formData);

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
