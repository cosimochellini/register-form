<template>
    <div class="text-gray-700 md:flex md:items-center mt-2">
        <div class="mb-1 md:mb-0 md:w-1/3">
            <label class="block mb-1 capitalize" :for="name" :id="`${name}_label`">{{ name }}</label>
        </div>
        <div class="md:w-2/3 md:flex-grow">
            <input
                v-bind="$attrs"
                class="input-form"
                :class="inputClass"
                :type="type"
                :id="`${name}_input`"
                :name="name"
                :value="modelValue"
                @change="onInput($event)"
            />
            <span
                v-if="errorMessage"
                class="text-xs text-red-700"
                :id="`${name}_error`"
            >{{ errorMessage }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { classBindings } from '../types'
import { defineComponent, PropType } from 'vue';
import { validationRule } from '../types/validation';

export default defineComponent({
    name: 'BaseInput',
    emits: ['update:modelValue'],
    inheritAttrs: false,
    props: {
        name: {
            type: String,
            required: true
        },
        modelValue: {
            type: String,
            required: true
        },
        type: {
            type: String as PropType<'text' | 'password' | 'date' | 'email'>,
            default: 'text'
        },
        rules: {
            type: Array as PropType<validationRule[]>,
            default: () => []
        }
    },
    data() {
        return {
            errorMessage: '',
        }
    },
    computed: {
        inputClass(): classBindings {
            return { 'border-red-500': !!this.errorMessage }
        },
    },
    methods: {
        validate(newValue: string) {

            for (const [validator, errorMessage] of this.rules) {
                if (!validator(newValue)) {
                    this.errorMessage = errorMessage;
                    return false;
                }
            }

            this.errorMessage = '';
            return true;
        },
        onInput(event: Event) {
            const newValue = (event.target as HTMLInputElement).value;

            this.validate(newValue);
            this.$emit('update:modelValue', newValue);
        },
        ensureInputIsValid() {
            console.log('ensureInputIsValid', this.modelValue);
            return this.validate(this.modelValue);
        }
    },
})

</script>
