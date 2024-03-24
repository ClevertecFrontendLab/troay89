export const paths = {
    root: {
        path: '/',
    },
    main: {
        path: '/main',
    },
    auth: {
        path: '/auth',
    },
    registration: {
        path: '/auth/registration',
    },
    feedbacks: {
        path: '/feedbacks',
    },
    trainingList: {
        path: '/calendar',
    },
    profile: {
        path: '/profile',
    },
    setting: {
        path: '/settings',
    },
    confirmEmail: {
        path: '/auth/confirm-email',
    },
    changePassport: {
        path: '/auth/change-password',
    },
    successRegistration: {
        path: '/result/success',
    },
    successChangePassport: {
        path: '/result/success-change-password',
    },
    errorRegistrationEmail: {
        path: '/result/error-user-exist',
    },
    errorResetEmail: {
        path: '/result/error-check-email-no-exist',
    },
    errorRegistrationGeneral: {
        path: '/result/error',
    },
    errorAuthGeneral: {
        path: '/result/error-login',
    },
    errorCheckEmailGeneral: {
        path: '/result/error-check-email',
    },
    errorChangePasswordGeneral: {
        path: '/result/error-change-password',
    },
};

export const statusCodes = {
    ERROR_400: 400,
    ERROR_403: 403,
    ERROR_404: 404,
    ERROR_409: 409,
    ERROR_500: 500,
    SUCCESS_200: 200,
};

export enum ResultStatusType {
    SUCCESS = 'success',
    ERROR_500 = '500',
    ERROR = 'error',
}

export const JVT_TOKEN = 'jwtToken';
