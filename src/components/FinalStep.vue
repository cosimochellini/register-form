<template>
    <Alert v-bind="text.introduction" v-if="!completed" />
    <Alert v-bind="text.completed" v-if="completed" />
    <BaseButton
        class="button-green mt-4"
        @click="handleClick"
        :loading="loading"
        v-if="!completed"
    >Send now</BaseButton>
</template>

<script lang="ts">
import Alert from './Alert.vue';
import BaseButton from './Input/BaseButton.vue';
import { defineComponent, PropType } from 'vue';
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
        return { text }
    },
    data() {
        return {
            loading: false,
            completed: false,
        }
    },
    methods: {
        async handleClick() {
            this.loading = true;

            try {
                await registerService.sendRegistration(this.payload);
                this.completed = true;
                this.$emit('success');

            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        }
    },
})

</script>
