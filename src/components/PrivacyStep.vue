<template>
    <form @submit.prevent="handleSubmit">
        <BaseInput ref="name" name="name" type="text" v-model="form.name" :rules="nameValidation" />

        <BaseInput
            type="text"
            ref="surname"
            name="surname"
            v-model="form.surname"
            :rules="surnameValidation"
        />
        <button type="submit" class="button-red mt-1" :disabled="!form.isValid">Submit</button>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseInput from './BaseInput.vue';
import { useValidation } from '../composables/useValidation';
import { registerService } from '../services/registerService';
import { nameValidation, surnameValidation } from '../validations/rules';

export default defineComponent({
    components: { BaseInput },

    setup() {
        const { triggerValidation, form } = useValidation({ name: "", surname: "" })

        return { nameValidation, surnameValidation, triggerValidation, form }
    },
    data() {
        return {}
    },
    methods: {
        async handleSubmit() {
            this.triggerValidation()

            const { isValid, ...formData } = this.form;

            if (!isValid) return;

            await registerService.validatePrivacy({ privacy: false, marketing: false });
            console.log('Form submitted');
        },
    },
})

</script>
