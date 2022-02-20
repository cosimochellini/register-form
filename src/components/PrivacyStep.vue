<template>
    <form @submit.prevent="handleSubmit">
        <h1 class="my-3 text-2xl font-semibold text-gray-700">Your privacy choice</h1>
        <p
            class="text-gray-400 max-w-xl"
        >Choose to accept only the privacy or even the marketing section to allow us to track your tastes for marketing purposes</p>

        <BaseCheckBox
            ref="privacy"
            name="privacy"
            type="checkbox"
            :readonly="!active"
            v-model="form.privacy"
        />

        <BaseCheckBox
            type="checkbox"
            ref="marketing"
            name="marketing"
            :readonly="!active"
            v-model="form.marketing"
        />

        <Alert v-if="!isValid" v-bind="alertText" type="warning" class="my-3" />

        <BaseButton
            type="submit"
            :loading="loading"
            @click="handleSubmit"
            class="mt-3 button-green"
            :disabled="!isValid || !active"
        >Next</BaseButton>
    </form>
</template>

<script lang="ts">
import Alert from './Alert.vue';
import { defineComponent } from 'vue'
import BaseButton from './Input/BaseButton.vue';
import BaseCheckBox from './Input/BaseCheckBox.vue';
import { registerService } from '../services/registerService';

const alertText = {
    title: 'You must accept the privacy section',
    description: 'You must accept the privacy section to continue the registration',
}

export default defineComponent({
    components: { BaseCheckBox, BaseButton, Alert },
    props: {
        active: { type: Boolean, required: true },
    },
    emits: ['submit'],
    setup() {
        return { alertText }
    },
    data() {
        return {
            loading: false,
            isValid: true,
            form: { privacy: false, marketing: false }
        }
    },
    methods: {
        async handleSubmit() {

            if (!this.form.privacy) {
                this.isValid = false
            }

            if (!this.isValid) return;

            this.loading = true;

            try {

                await registerService.validatePrivacy(this.form)

                this.$emit('submit', this.form);
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
    },
    watch: {
        form: {
            handler(newValue) {
                this.isValid = newValue.privacy
            },
            deep: true
        }
    }
})

</script>
