export type User = {
    email: string;
    password: string;
    isSave?: boolean;
};

export type UserCheckEmail = {
    email: string;
};

export type UserNewPassword = {
    password: string;
};

export type UserConfirmEmail = {
    email: string;
    code: string;
};

export type UserChangePassword = {
    password: string;
    confirmPassword: string;
};

export type InfoUser = {
    email?: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    imgSrc?: string;
    readyForJointTraining?: boolean;
    sendNotification?: boolean;
    password?: string;
    tariff?: {
        tariffId: string;
        expired: string;
    };
};
