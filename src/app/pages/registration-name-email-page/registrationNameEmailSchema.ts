import * as yup from 'yup';

import { VALIDATY } from '~/constants/validation';

export const registrationNameEmailSchema = yup
    .object({
        firstName: yup
            .string()
            .max(50, VALIDATY.ERR_MAX_LENGTH)
            .required(VALIDATY.ERR_REQUIRED_FIRST_NAME)
            .matches(VALIDATY.REGEX_FIRST_LETTER_CYRILLIC, VALIDATY.ERR_FIRST_LETTER_CYRILLIC)
            .matches(VALIDATY.REGEX_ONLY_CYRILLIC, VALIDATY.ERR_ONLY_CYRILLIC),
        lastName: yup
            .string()
            .max(50, VALIDATY.ERR_MAX_LENGTH)
            .required(VALIDATY.ERR_REQUIRED_LAST_NAME)
            .matches(VALIDATY.REGEX_FIRST_LETTER_CYRILLIC, VALIDATY.ERR_FIRST_LETTER_CYRILLIC)
            .matches(VALIDATY.REGEX_ONLY_CYRILLIC, VALIDATY.ERR_ONLY_CYRILLIC),
        email: yup
            .string()
            .max(50, VALIDATY.ERR_MAX_LENGTH)
            .required(VALIDATY.ERR_REQUIRED_EMAIL)
            .email(VALIDATY.ERR_INVALID_EMAIL)
            .matches(VALIDATY.REGEX_EMAIL, VALIDATY.ERR_INVALID_EMAIL),
    })
    .required();

export type registrationNameEmailData = {
    firstName: string;
    lastName: string;
    email: string;
};
