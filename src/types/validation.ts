export type validator = (value: string) => boolean;

export type validationRule = [validator: validator, errorMessage: string];
