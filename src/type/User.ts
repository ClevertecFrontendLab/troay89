export interface User {
    email: string;
    password: string;
    isSave?: boolean;
}

export interface UserCheckEmail {
    email: string;
}

export interface UserConfirmEmail {
    email: string;
    code: string;
}
