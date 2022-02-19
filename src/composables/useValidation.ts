import { getCurrentInstance, nextTick, watch, reactive } from "vue"

interface Options {
    autoFocus?: boolean
}

export const useValidation = <T extends {}>(formInitialValue: T, options: Partial<Options> = {}) => {
    const instance = getCurrentInstance()

    if (!instance) throw new Error("useValidation must be used inside a Vue component")

    const form = reactive({ ...formInitialValue, isValid: true });

    const refs = Object.keys(formInitialValue);

    const triggerValidation = (force = false) => {
        let someError = false;
        const instanceRefs = instance.refs;

        // for each ref, I check if the value is valid
        for (const refName of refs) {
            const ref = instanceRefs[refName];

            // @ts-ignore
            // this method is in the BaseInput methods, but for a better DX I check if the ref is correct
            const validation = ref?.ensureInputIsValid as (force: boolean) => boolean;

            if (typeof validation !== 'function') {
                console.error('Invalid ref, please ensure that the ref is a valid BaseInput component');
                someError = true;
                break;
            }

            if (!validation(force)) {
                someError = true;

                if (options?.autoFocus) {
                    // @ts-ignore
                    // this is a ref to the input of the BaseInput component
                    ref.$refs.input.focus()
                }

                break
            }
        }

        form.isValid = !someError;
    }

    watch(form, () => nextTick(triggerValidation));

    return { form, triggerValidation }
}
