import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, UserChangePassword, UserCheckEmail, UserConfirmEmail } from '../../type/User.ts';

interface ServerResponseAuth {
    accessToken: string;
}

export const apiSlices = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<{ statusCode: number }, Partial<User>>({
            query: (userData) => ({
                url: 'auth/registration',
                method: 'POST',
                body: userData,
            }),
            transformResponse: () => ({
                statusCode: 201,
            }),
        }),
        authUser: builder.mutation<{ statusCode: number; accessToken: string }, Partial<User>>({
            query: (userData) => ({
                url: 'auth/login',
                method: 'POST',
                body: userData,
            }),
            transformResponse: (response: ServerResponseAuth) => ({
                statusCode: 201,
                accessToken: response.accessToken,
            }),
        }),
        authCheckEmail: builder.mutation<{ statusCode: number }, Partial<UserCheckEmail>>({
            query: (userData) => ({
                url: 'auth/check-email',
                method: 'POST',
                body: userData,
            }),
            transformResponse: () => ({
                statusCode: 200,
            }),
        }),
        authConfirmEmail: builder.mutation<{ statusCode: number }, Partial<UserConfirmEmail>>({
            query: (userData) => ({
                url: 'auth/confirm-email',
                method: 'POST',
                body: userData,
            }),
            transformResponse: () => ({
                statusCode: 200,
            }),
        }),
        authChangePassword: builder.mutation<{ statusCode: number }, Partial<UserChangePassword>>({
            query: (userData) => ({
                url: 'auth/change-password',
                method: 'POST',
                body: userData,
            }),
            transformResponse: () => ({
                statusCode: 201,
            }),
        }),
    }),
});

export const { useRegisterUserMutation } = apiSlices;
export const { useAuthUserMutation } = apiSlices;
export const { useAuthCheckEmailMutation } = apiSlices;
export const { useAuthConfirmEmailMutation } = apiSlices;
export const { useAuthChangePasswordMutation } = apiSlices;
