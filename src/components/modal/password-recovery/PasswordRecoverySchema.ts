import * as yup from 'yup';

export type PasswordRecoveryData = {
    email: string;
};

export const passwordRecovery = yup
    .object({
        email: yup
            .string()
            .max(50, 'Максимальная длина 50 символов')
            .required('Введите e-mail')
            .email('Введите корректный e-mail')
            .matches(/\.[A-Za-z]{2,}$/, 'Введите корректный e-mail'),
    })
    .required();
