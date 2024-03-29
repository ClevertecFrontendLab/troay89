import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    InfoUser,
    User,
    UserChangePassword,
    UserCheckEmail,
    UserConfirmEmail,
} from '../../type/User.ts';
import { Comments, SendComment, ServerResponseAuth } from '../../type/Data.ts';
import { PersonalTraining, TrainingList } from '../../type/Training.ts';
import { JVT_TOKEN } from '@constants/constants.ts';
import { buyTariff, TariffList } from '../../type/Tariff.ts';

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
        getUserInfo: builder.query<InfoUser, void>({
            query: () => ({
                url: 'user/me',
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
        changeUserInfo: builder.mutation<
            {
                email: string;
                firstName: string;
                lastName: string;
                birthday: string;
                readyForJointTraining: boolean;
                sendNotification: boolean;
            },
            Partial<InfoUser>
        >({
            query: (personalInfo) => ({
                url: 'user',
                method: 'PUT',
                body: personalInfo,
                headers: {
                    Authorization:
                        'Bearer ' +
                        (localStorage.getItem(JVT_TOKEN)
                            ? localStorage.getItem(JVT_TOKEN)
                            : sessionStorage.getItem(JVT_TOKEN)),
                },
            }),
        }),
        uploadImage: builder.mutation<{ name: string; url: string }, FormData>({
            query: (file: FormData) => ({
                url: 'upload-image',
                method: 'POST',
                body: file,
                headers: {
                    Authorization:
                        'Bearer ' +
                        (localStorage.getItem(JVT_TOKEN)
                            ? localStorage.getItem(JVT_TOKEN)
                            : sessionStorage.getItem(JVT_TOKEN)),
                },
            }),
        }),
        getRateInfo: builder.query<Array<TariffList>, void>({
            query: () => ({
                url: 'catalogs/tariff-list',
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
        buyTariff: builder.mutation<{ statusCode: number }, Partial<buyTariff>>({
            query: (tariff) => ({
                url: 'tariff',
                method: 'POST',
                body: tariff,
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
export const { useLazyGetPersonalTrainingListQuery } = apiSlices;
export const { useLazyGetTrainingListQuery } = apiSlices;
export const { useAddPersonalTrainingListMutation } = apiSlices;
export const { useEditPersonalTrainingListMutation } = apiSlices;
export const { useGetUserInfoQuery } = apiSlices;
export const { useChangeUserInfoMutation } = apiSlices;
export const { useUploadImageMutation } = apiSlices;
export const { useGetRateInfoQuery } = apiSlices;
export const { useBuyTariffMutation } = apiSlices;
