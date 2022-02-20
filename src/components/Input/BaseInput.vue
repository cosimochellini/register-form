<template>
    <div class="text-gray-700 md:flex md:items-center mt-2">
        <div class="mb-1 md:mb-0 md:w-1/3">
            <label
                class="block mb-1 capitalize font-semibold max-w-md"
                :for="name"
                :id="`${name}_label`"
            >{{ name }}</label>
        </div>
        <div class="md:w-2/3 md:flex-grow">
            <input
                ref="input"
                :type="type"
                :name="name"
                v-bind="$attrs"
                class="input-form"
                :class="inputClass"
                :value="modelValue"
                :disabled="readonly"
                :readonly="readonly"
                :id="`${name}_input`"
                @input="onInput($event)"
            />
            <Transition>
                <div
                    v-if="errorMessage"
                    class="relative text-xs text-red-700"
                    :id="`${name}_error`"
                >{{ errorMessage }}</div>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts">
import { classBindings } from '../../types'
import { defineComponent, PropType } from 'vue';
import { validationRule } from '../../types/validation';

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
            type: String as PropType<'text' | 'password' | 'date' | 'email' | 'tel'>,
            default: 'text'
        },
        rules: {
            type: Array as PropType<validationRule[]>,
            default: () => []
        },
        readonly: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            dirty: false,
            errorMessage: '',
        }
    },
    computed: {
        inputClass(): classBindings {
            return {
                'is-invalid': !!this.errorMessage,
            }
        },
    },
    methods: {
        validate(newValue: string, force = false) {
            if (!this.dirty && !force) return;

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
            this.dirty = true;
            const element = event.target as HTMLInputElement;
            const newValue = element.value;

            this.validate(newValue);
            this.$emit('update:modelValue', newValue);
        },
        ensureInputIsValid(force: boolean = false) {
            return this.validate(this.modelValue, force);
        }
    },
})

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
