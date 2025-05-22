import * as yup from 'yup';

import { VALIDATY } from '~/constants/validation';

export const loginSchema = yup
    .object({
        login: yup.string().required(VALIDATY.ERR_REQUIRED_LOGIN).max(50, VALIDATY.ERR_MAX_LENGTH),
        password: yup
            .string()
            .required(VALIDATY.ERR_REQUIRED_PASSWORD)
            .max(50, VALIDATY.ERR_MAX_LENGTH),
    })
    .required();

export type LoginData = {
    login: string;
    password: string;
};
