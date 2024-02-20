import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../type/User.ts';

interface ServerResponse {
    accessToken: string;
}

export const apiSlices = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://marathon-api.clevertec.ru/' }),
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
            transformResponse: (response: ServerResponse) => ({
                statusCode: 201,
                accessToken: response.accessToken,
            }),
        }),
    }),
});

export const { useRegisterUserMutation } = apiSlices;
export const { useAuthUserMutation } = apiSlices;
