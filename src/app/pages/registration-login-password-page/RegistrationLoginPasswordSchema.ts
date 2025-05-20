import * as yup from 'yup';

export const registrationLoginPasswordSchema = yup
    .object({
        login: yup
            .string()
            .required('Введите логин')
            .min(5, 'Не соответствует формату')
            .max(50, 'Максимальная длина 50 символов')
            .matches(/^[A-Za-z!@#$&_+\-.]+$/, 'Не соответствует формату'),
        password: yup
            .string()
            .required('Введите пароль')
            .min(8, 'Не соответствует формату')
            .max(50, 'Максимальная длина 50 символов')
            .matches(/^(?=.*\d)(?=.*[A-Z])[A-Za-z\d!@#$&_+\-.]+$/, 'Не соответствует формату'),
        passwordConfirm: yup
            .string()
            .required('Повторите пароль')
            .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
    })
    .required();

export type registrationLoginPasswordData = {
    login: string;
    password: string;
    passwordConfirm: string;
};
