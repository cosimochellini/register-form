import { getCurrentInstance, nextTick, watch, reactive } from "vue"

export const useValidation = <T extends {}>(formInitialValue: T) => {
    const instance = getCurrentInstance()

    if (!instance) throw new Error("useValidation must be used inside a Vue component")

    const form = reactive({ ...formInitialValue, isValid: true });

    const refs = Object.keys(formInitialValue);

    const triggerValidation = () => {
        let someError = false;
        const instanceRefs = instance.refs;

        // for each ref, I check if the value is valid
        for (const refName of refs) {
            const ref = instanceRefs[refName];

            // @ts-ignore
            // this method is in the BaseInput methods, but for a better DX I check if the ref is correct
            const validation = ref?.ensureInputIsValid as () => boolean;

            if (typeof validation !== 'function') {
                console.error('Invalid ref, please ensure that the ref is a valid BaseInput component');
                someError = true;
                break;
            }

            if (!validation()) {
                someError = true;
                break
            }
        }

        form.isValid = !someError;
    }

    watch(form, () => nextTick(triggerValidation));

    return { form, triggerValidation }
}
