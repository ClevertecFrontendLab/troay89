import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../type/User.ts';

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
    }),
});

export const { useRegisterUserMutation } = apiSlices;
