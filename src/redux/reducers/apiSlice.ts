import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, UserChangePassword, UserCheckEmail, UserConfirmEmail } from '../../type/User.ts';
import { Comments, SendComment, ServerResponseAuth } from '../../type/Data.ts';
import { PersonalTraining, TrainingList } from '../../type/Training.ts';
import { JVT_TOKEN } from '@constants/constants.ts';

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
        sendFeedback: builder.mutation<{ statusCode: number }, Partial<SendComment>>({
            query: (messageData) => ({
                url: 'feedback',
                method: 'POST',
                body: messageData,
                headers: {
                    Authorization:
                        'Bearer ' +
                        (localStorage.getItem('jwtToken')
                            ? localStorage.getItem('jwtToken')
                            : sessionStorage.getItem('jwtToken')),
                },
            }),
            transformResponse: () => ({
                statusCode: 201,
            }),
        }),
        getFeedbacks: builder.query<Array<Comments>, void>({
            query: () => ({
                url: 'feedback',
                headers: {
                    Authorization:
                        'Bearer ' +
                        (localStorage.getItem(JVT_TOKEN)
                            ? localStorage.getItem(JVT_TOKEN)
                            : sessionStorage.getItem(JVT_TOKEN)),
                },
                transformResponse: () => ({
                    statusCode: 201,
                }),
            }),
        }),
        getTrainingList: builder.query<Array<TrainingList>, void>({
            query: () => ({
                url: 'catalogs/training-list',
                headers: {
                    Authorization:
                        'Bearer ' +
                        (localStorage.getItem(JVT_TOKEN)
                            ? localStorage.getItem(JVT_TOKEN)
                            : sessionStorage.getItem(JVT_TOKEN)),
                },
                transformResponse: () => ({
                    statusCode: 200,
                }),
            }),
        }),
        getPersonalTrainingList: builder.query<Array<PersonalTraining>, void>({
            query: () => ({
                url: 'training',
                headers: {
                    Authorization:
                        'Bearer ' +
                        (localStorage.getItem(JVT_TOKEN)
                            ? localStorage.getItem(JVT_TOKEN)
                            : sessionStorage.getItem(JVT_TOKEN)),
                },
                transformResponse: () => ({
                    statusCode: 200,
                }),
            }),
        }),
        addPersonalTrainingList: builder.mutation<
            { statusCode: number },
            Partial<PersonalTraining>
        >({
            query: (listTraining) => ({
                url: 'training',
                method: 'POST',
                body: listTraining,
                headers: {
                    Authorization:
                        'Bearer ' +
                        (localStorage.getItem(JVT_TOKEN)
                            ? localStorage.getItem(JVT_TOKEN)
                            : sessionStorage.getItem(JVT_TOKEN)),
                },
                transformResponse: () => ({
                    statusCode: 200,
                }),
            }),
        }),
        editPersonalTrainingList: builder.mutation<
            { statusCode: number },
            Partial<PersonalTraining>
        >({
            query: (listTraining) => ({
                url: `training/${listTraining._id}`,
                method: 'PUT',
                body: listTraining,
                headers: {
                    Authorization:
                        'Bearer ' +
                        (localStorage.getItem(JVT_TOKEN)
                            ? localStorage.getItem(JVT_TOKEN)
                            : sessionStorage.getItem(JVT_TOKEN)),
                },
                transformResponse: () => ({
                    statusCode: 200,
                }),
            }),
        }),
    }),
});

export const { useRegisterUserMutation } = apiSlices;
export const { useAuthUserMutation } = apiSlices;
export const { useAuthCheckEmailMutation } = apiSlices;
export const { useAuthConfirmEmailMutation } = apiSlices;
export const { useAuthChangePasswordMutation } = apiSlices;
export const { useSendFeedbackMutation } = apiSlices;
export const { useGetFeedbacksQuery } = apiSlices;
export const { useLazyGetFeedbacksQuery } = apiSlices;
export const { useGetPersonalTrainingListQuery } = apiSlices;
export const { useLazyGetPersonalTrainingListQuery } = apiSlices;
export const { useGetTrainingListQuery } = apiSlices;
export const { useLazyGetTrainingListQuery } = apiSlices;
export const { useAddPersonalTrainingListMutation } = apiSlices;
export const { useEditPersonalTrainingListMutation } = apiSlices;
