import * as yup from 'yup';

export const loginSchema = yup
    .object({
        login: yup.string().required('Введите логин').max(50, 'Максимальная длина 50 символов'),
        password: yup.string().required('Введите пароль').max(50, 'Максимальная длина 50 символов'),
    })
    .required();

export type LoginData = {
    login: string;
    password: string;
};
