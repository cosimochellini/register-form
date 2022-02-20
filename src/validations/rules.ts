import { validationRule } from '../types/validation';

const phoneRegExp = /^(\((00|\+)39\)|(00|\+)39)?(38[890]|34[4-90]|36[680]|33[13-90]|32[89]|35[01]|37[019])\d{6,7}$/
const emailRegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const stringRequired = (value: string) => !!value;

const minLength = (min: number) => (value: string) => value.length >= min;

const maxLength = (max: number) => (value: string) => value.length <= max;

const validEmail = (value: string) => emailRegExp.test(value);

const validPhone = (value: string) => phoneRegExp.test(value);

const validPassword = (value: string) => passwordRegExp.test(value);

const isDate = (value: string) => !isNaN(Date.parse(value));

const hasMinimumAge = (min: number) => (value: string) => retrieveYears(value) >= min;
const hasMaximumAge = (max: number) => (value: string) => retrieveYears(value) <= max;

const trueCheckbox = (value: string) => value === 'true';

function retrieveYears(birthday: string) {
    const ageDifMs = Date.now() - Date.parse(birthday);
    const ageDate = new Date(ageDifMs); // milliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const nameValidation: validationRule[] = [
    [stringRequired, 'Name is required'],
    [minLength(3), 'Name must be at least 3 characters'],
    [maxLength(128), 'Name must be at most 128 characters long'],
];

export const surnameValidation: validationRule[] = [
    [stringRequired, 'Surname is required'],
    [minLength(3), 'Surname must be at least 3 characters'],
    [maxLength(128), 'Surname must be at most 128 characters long'],
];

export const emailValidation: validationRule[] = [
    [stringRequired, 'Email is required'],
    [validEmail, 'Email is not valid'],
];

export const phoneValidation: validationRule[] = [
    [stringRequired, 'Phone is required'],
    [validPhone, 'Phone is not valid'],
];

export const passwordValidation: validationRule[] = [
    [stringRequired, 'Password is required'],
    [minLength(8), 'Password must be at least 8 characters long'],
    [maxLength(128), 'Password must be at most 128 characters long'],
    [validPassword, 'Password is not valid'],
];

export const birthDateValidation: validationRule[] = [
    [stringRequired, 'Birth date is required'],
    [isDate, 'Birth date is not valid'],
    [hasMinimumAge(18), 'You must be at least 18 years old'],
    [hasMaximumAge(100), 'You must be at most 100 years old o_o'],
];

export const privacyValidation: validationRule[] = [
    [trueCheckbox, 'You must accept the privacy policy'],
]
