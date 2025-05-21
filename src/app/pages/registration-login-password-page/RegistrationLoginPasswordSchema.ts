import * as yup from 'yup';

import { VALIDATY } from '~/constants/validation';

export const registrationLoginPasswordSchema = yup
    .object({
        login: yup
            .string()
            .required(VALIDATY.ERR_REQUIRED_LOGIN)
            .min(5, VALIDATY.ERR_INVALID_FORMAT)
            .max(50, VALIDATY.ERR_MAX_LENGTH)
            .matches(VALIDATY.REGEX_LOGIN, VALIDATY.ERR_INVALID_FORMAT),
        password: yup
            .string()
            .required(VALIDATY.ERR_REQUIRED_PASSWORD)
            .min(8, VALIDATY.ERR_INVALID_FORMAT)
            .max(50, VALIDATY.ERR_MAX_LENGTH)
            .matches(VALIDATY.REGEX_PASSWORD, VALIDATY.ERR_INVALID_FORMAT),
        passwordConfirm: yup
            .string()
            .required(VALIDATY.ERR_REQUIRED_PASSWORD_CONFIRM)
            .oneOf([yup.ref('password')], VALIDATY.ERR_PASSWORD_MISMATCH),
    })
    .required();

export type registrationLoginPasswordData = {
    login: string;
    password: string;
    passwordConfirm: string;
};
