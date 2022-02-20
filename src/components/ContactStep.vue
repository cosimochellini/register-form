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
        <BaseButton
            type="submit"
            :loading="loading"
            class="mt-1 button-green align-self-end"
            :disabled="!form.isValid || !active"
            @click="handleSubmit"
        >Next</BaseButton>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseInput from './BaseInput.vue';
import BaseButton from './BaseButton.vue';
import { useValidation } from '../composables/useValidation';
import { registerService } from '../services/registerService';
import { emailValidation, phoneValidation } from '../validations/rules';

export default defineComponent({
    components: { BaseInput, BaseButton },
    props: {
        active: { type: Boolean, required: true },
    },
    emits: ['submit'],
    setup() {
        const { triggerValidation, form } = useValidation({ email: "", phone: "" })

        return { emailValidation, phoneValidation, triggerValidation, form }
    },
    data() {
        return {
            loading: false,
        }
    },
    methods: {
        async handleSubmit() {
            this.triggerValidation()

            const { isValid, ...formData } = this.form;

            if (!isValid) return;

            this.loading = true;

            try {
                await registerService.validateContact(formData);
                this.$emit('submit', formData);
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
    },
})

</script>
