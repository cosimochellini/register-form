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
                :name="name"
                v-bind="$attrs"
                type="checkbox"
                class="input-form"
                :value="modelValue"
                :readonly="readonly"
                :disabled="readonly"
                :id="`${name}_input`"
                @input="onInput($event)"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { classBindings } from '../../types'

export default defineComponent({
    name: 'BaseCheckBox',
    emits: ['update:modelValue'],
    inheritAttrs: false,
    props: {
        name: {
            type: String,
            required: true
        },
        modelValue: {
            type: Boolean,
            required: true
        },
        readonly: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {

        onInput(event: Event) {

            const element = event.target as HTMLInputElement;
            const newValue = element.checked;

            this.$emit('update:modelValue', newValue);
        },

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
