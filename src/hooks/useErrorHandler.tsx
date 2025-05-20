import { Dispatch, SetStateAction } from 'react';

import { ERROR_MESSAGE } from '~/constants/errorMessage';
import { BaseErrorResponse } from '~/type/baseErrorResponse';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';

export type AuthErrorContext =
    | 'login'
    | 'registration'
    | 'otp'
    | 'password-recovery'
    | 'reset-password';

export const useHandleError =
    (
        setTitle: Dispatch<SetStateAction<string>>,
        setNotification: Dispatch<SetStateAction<string>>,
        context: AuthErrorContext,
    ) =>
    (error: unknown) => {
        if (!isFetchBaseQueryError(error)) {
            setTitle(ERROR_MESSAGE.ERROR_SERVER);
            setNotification(ERROR_MESSAGE.ERROR_SERVER_NOTIFICATION);
            return;
        }

        const err = error as { status: number; data?: BaseErrorResponse };

        switch (err.status) {
            case 400:
                if (err.data?.message?.toLowerCase().includes('email')) {
                    setTitle(ERROR_MESSAGE.EMAIL_EXITS);
                    setNotification('');
                } else if (err.data?.message?.toLowerCase().includes('login')) {
                    setTitle(ERROR_MESSAGE.LOGIN_EXITS);
                    setNotification('');
                } else {
                    setTitle(ERROR_MESSAGE.ERROR_SERVER);
                    setNotification(ERROR_MESSAGE.ERROR_SERVER_NOTIFICATION);
                }
                break;

            case 401:
                setTitle(ERROR_MESSAGE.INCORRECT_LOGIN);
                setNotification(ERROR_MESSAGE.INCORRECT_LOGIN_NOTIFICATION);
                break;

            case 403:
                switch (context) {
                    case 'login':
                        setTitle(ERROR_MESSAGE.EMAIL_NOT_VERIFIED);
                        setNotification(ERROR_MESSAGE.EMAIL_NOT_VERIFIED_NOTIFICATION);
                        break;
                    case 'otp':
                        setTitle('Неверный код');
                        setNotification('Введите правильный код из письма');
                        break;
                    case 'password-recovery':
                        setTitle(ERROR_MESSAGE.EMAIL_NOT_EXITS);
                        setNotification(ERROR_MESSAGE.EMAIL_NOT_EXITS_NOTIFICATION);
                        break;
                    default:
                        setTitle(ERROR_MESSAGE.ERROR_SERVER);
                        setNotification(ERROR_MESSAGE.ERROR_SERVER_NOTIFICATION);
                }
                break;

            case 500:
                setTitle(ERROR_MESSAGE.ERROR_SERVER);
                setNotification(ERROR_MESSAGE.ERROR_SERVER_NOTIFICATION);
                break;

            default:
                setTitle('Произошла ошибка');
                setNotification('');
        }
    };
