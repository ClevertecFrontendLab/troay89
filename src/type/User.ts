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

export type DataUser = {
    email: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    imgSrc: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    tariff: {
        tariffId: string;
        expired: Date;
    };
};
