<template>
    <Alert v-bind="text.introduction" v-if="!completed" type="info" />
    <Alert v-bind="text.completed" v-else type="success" />
    <Alert v-bind="backendError" v-if="apiError" type="error" class="my-4" />
    <BaseButton
        v-if="!completed"
        :loading="loading"
        @click="handleClick"
        class="button-green mt-4"
    >Send now</BaseButton>
</template>

<script lang="ts">
import Alert from './Alert.vue';
import BaseButton from './Input/BaseButton.vue';
import { defineComponent, PropType } from 'vue';
import { backendError } from '../shared/messages';
import { registrationPayload } from '../types/registration';
import { registerService } from '../services/registerService';

const text = {
    introduction: {
        title: "You've successfully inserted your data!",
        description: "You can hit send now to complete the registration!",
    },
    completed: {
        title: "You've successfully registered!",
        description: "Please check your email to confirm your registration!",
    }
}

export default defineComponent({
    name: 'FinalStep',
    emits: ['success'],
    props: {
        payload: {
            type: Object as PropType<registrationPayload>,
            required: true,
        },
    },
    components: { Alert, BaseButton },
    setup() {
        return { text, backendError }
    },
    data() {
        return {
            loading: false,
            completed: false,
            apiError: false,
        }
    },
    methods: {
        async handleClick() {
            this.loading = true;
            this.apiError = false;

            try {
                const isValid = await registerService.sendRegistration(this.payload);

                if (!isValid) {
                    this.apiError = true;
                } else {
                    this.completed = true;
                    this.apiError = false;
                    this.$emit('success');
                }
            } catch (error) {
                console.error(error);
                this.apiError = true;
            } finally {
                this.loading = false;
            }
        }
    },
})

</script>
