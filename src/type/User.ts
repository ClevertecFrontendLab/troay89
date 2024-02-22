export interface User {
    email: string;
    password: string;
    isSave?: boolean;
}

export interface UserCheckEmail {
    email: string;
}

export interface UserNewPassword {
    password: string;
}

export interface UserConfirmEmail {
    email: string;
    code: string;
}

export interface UserChangePassword {
    password: string;
    confirmPassword: string;
}
