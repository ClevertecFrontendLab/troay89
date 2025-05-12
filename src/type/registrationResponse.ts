export type RegistrationResponse = {
    message: string[];
    error: string;
    statusCode: number;
    accessToken: string | null;
};
