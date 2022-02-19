<template>
    <form @submit.prevent="handleSubmit">
        <h1 class="my-3 text-2xl font-semibold text-gray-700">Your privacy choice</h1>
        <p
            class="text-gray-400 max-w-xl"
        >Choose to accept only the privacy or even the marketing section to allow us to track your tastes for marketing purposes</p>

        <BaseInput
            ref="privacy"
            name="privacy"
            type="checkbox"
            v-model="form.privacy"
            :rules="privacyValidation"
        />

        <BaseInput type="checkbox" ref="marketing" name="marketing" v-model="form.marketing" />
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
import { privacyValidation } from '../validations/rules';

const checkboxParser = (value: string) => value === 'true'

export default defineComponent({
    components: { BaseInput, BaseButton },
    props: {
        active: { type: Boolean, required: true },
    },
    emits: ['submit'],
    setup() {
        const { triggerValidation, form } = useValidation({ privacy: 'false', marketing: 'false' })

        return { privacyValidation, triggerValidation, form }
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
                const { privacy, marketing } = formData
                const data = { privacy: checkboxParser(privacy), marketing: checkboxParser(marketing) };

                await registerService.validatePrivacy(data)

                this.$emit('submit', data);
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
    },
})

</script>
