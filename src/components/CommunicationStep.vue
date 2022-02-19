<template>
    <form @submit.prevent="handleSubmit">
        <BaseInput ref="email" name="email" type="email" v-model="form.email" :rules="emailValidation" />

        <BaseInput
            type="tel"
            ref="phone"
            name="phone"
            v-model="form.phone"
            :rules="phoneValidation"
        />
        <button type="submit" class="button-red mt-1" :disabled="!form.isValid">Submit</button>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseInput from './BaseInput.vue';
import { useValidation } from '../composables/useValidation';
import { registerService } from '../services/registerService';
import { emailValidation, phoneValidation } from '../validations/rules';

export default defineComponent({
    components: { BaseInput },

    setup() {
        const { triggerValidation, form } = useValidation({ email: "", phone: "" })

        return { emailValidation, phoneValidation, triggerValidation, form }
    },
    data() {
        return {}
    },
    methods: {
        async handleSubmit() {
            this.triggerValidation()

            const { isValid, ...formData } = this.form;

            if (!isValid) return;

            await registerService.validateCommunication(formData);
            console.log('Form submitted');
        },
    },
})

</script>
