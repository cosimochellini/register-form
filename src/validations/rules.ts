import { validationRule } from '../types/validation';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
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
];
