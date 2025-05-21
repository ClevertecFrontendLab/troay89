import * as yup from 'yup';

import { VALIDATY } from '~/constants/validation';

export type PasswordRecoveryData = {
    email: string;
};

export const passwordRecoverySchema = yup
    .object({
        email: yup
            .string()
            .max(50, VALIDATY.ERR_MAX_LENGTH)
            .required(VALIDATY.ERR_REQUIRED_EMAIL)
            .email(VALIDATY.ERR_INVALID_EMAIL)
            .matches(VALIDATY.REGEX_EMAIL, VALIDATY.ERR_INVALID_EMAIL),
    })
    .required();
