<template>
    <form @submit.prevent="handleSubmit">
        <div class="text-left">
            <h1 class="my-3 text-2xl font-semibold text-gray-700">Your registry information</h1>
            <p class="text-gray-400">Fill up the form below to send us a message.</p>
        </div>

        <BaseInput
            ref="name"
            name="name"
            type="text"
            placeholder="mario"
            v-model="form.name"
            :rules="nameValidation"
        />

        <BaseInput
            type="text"
            ref="surname"
            name="surname"
            placeholder="rossi"
            v-model="form.surname"
            :rules="surnameValidation"
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
        />
        <BaseButton
            type="submit"
            :loading="loading"
            class="mt-1 button-green align-self-end"
            :disabled="!form.isValid"
            @click="handleSubmit"
        >Next</BaseButton>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseInput from './BaseInput.vue';
import BaseButton from './BaseButton.vue';
import { pastYearsAgo } from '../utils/date';
import { useValidation } from '../composables/useValidation';
import { registerService } from '../services/registerService';
import { nameValidation, surnameValidation, birthDateValidation } from '../validations/rules';

export default defineComponent({
    components: { BaseInput, BaseButton },

    setup() {
        const { triggerValidation, form } = useValidation({ name: "", surname: "", birthDate: "" })

        return { nameValidation, surnameValidation, birthDateValidation, triggerValidation, form }
    },
    data() {
        return {
            loading: false,
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
            try {

                await registerService.validateRegistry(formData);
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }

            console.log('Form submitted', formData);
        },
    },
})

</script>
