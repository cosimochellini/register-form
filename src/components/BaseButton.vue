<template>
    <button @click="handleClick" v-bind="buttonAttrs">
        <slot />
        <Spinner class="ml-3" v-if="loading" />
    </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Spinner from './svg/Spinner.vue';

export default defineComponent({
    inheritAttrs: false,
    name: 'BaseInput',
    emits: ['click'],
    props: {
        loading: {
            type: Boolean,
            default: false
        },
    },
    components: {
        Spinner
    },
    methods: {
        handleClick(e: Event) {
            const shouldClick = !this.$attrs.disabled === undefined && this.loading;

            if (shouldClick) {
                this.$emit('click', e);
            }
        }
    },
    computed: {
        buttonAttrs() {
            return {
                ...this.$attrs,
                disabled: (this.loading || this.$attrs.disabled) as boolean,
            }
        }
    }
})
</script>
