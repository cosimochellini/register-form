<template>
    <div class="text-gray-700 flex items-center mt-2">
        <div class="mb-0 w-1/3">
            <label
                class="block mb-1 capitalize font-semibold max-w-md"
                :for="name"
                :id="`${name}_label`"
            >{{ name }}</label>
        </div>
        <div class="w-2/3 flex-grow">
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
