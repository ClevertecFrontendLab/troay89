import * as yup from 'yup';

export const registrationNameEmailSchema = yup
    .object({
        firstName: yup
            .string()
            .max(50, 'Максимальная длина 50 символов')
            .required('Введите имя')
            .matches(/^[А-Я]/, 'Должно начинаться с кириллицы А-Я')
            .matches(/^[А-Я][а-я-]*$/, 'Только кириллица А-Я, и "-"'),
        lastName: yup
            .string()
            .max(50, 'Максимальная длина 50 символов')
            .required('Введите фамилию')
            .matches(/^[А-Я]/, 'Должно начинаться с кириллицы А-Я')
            .matches(/^[А-Я][а-я-]*$/, 'Только кириллица А-Я, и "-"'),
        email: yup
            .string()
            .max(50, 'Максимальная длина 50 символов')
            .required('Введите e-mail')
            .email('Введите корректный e-mail')
            .matches(/\.[A-Za-z]{2,}$/, 'Введите корректный e-mail'),
    })
    .required();

export type registrationNameEmailData = {
    firstName: string;
    lastName: string;
    email: string;
};
