import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
    DraftRecipeFormValues,
    RecipeFormValues,
} from '~/app/pages/new-recipe-page/NewRecipeSchema';
import { STORAGE_KEY } from '~/constants/storageKey';
import { URLS } from '~/constants/url';
import { AuthorData } from '~/type/author';
import { BloggerData } from '~/type/bloggerData';
import { CategoriesResponse } from '~/type/Category';
import { DecodedAccessToken } from '~/type/decodedAccessToken';
import { LoginDataType } from '~/type/LoginDataType';
import { MeasureUnitsResponse } from '~/type/measureUnitsResponse';
import { RecipeResponse } from '~/type/RecipeResponse';
import { RecipeType, RecipeTypeResponse } from '~/type/RecipeType';
import { RegistrationData } from '~/type/registrationData';
import { RecipeBlogger } from '~/type/responceGetRecipeBlogger';
import { Response } from '~/type/response';
import { UploadFileData } from '~/type/UploadFileData';
import { UploadFileResponse } from '~/type/uploadFileResponse';

import { PATH } from './constants';
import {
    CategoryPath,
    ForgotPasswordData,
    RecipeId,
    RecipesCategoryQueryParams,
    RecipesQueryParams,
    ResetPasswordData,
    ToggleSubscriptionRequest,
    VerifyOtpData,
} from './types';

const RECIPE = 'recipe' as const;
const BLOGGERS = 'blogers' as const;
const LIST = 'list' as const;

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: URLS.BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: [RECIPE, BLOGGERS],
    endpoints: (build) => ({
        getCategories: build.query<CategoriesResponse, void>({
            query: () => PATH.CATEGORY,
        }),
        getCategory: build.query<CategoriesResponse, CategoryPath>({
            query: ({ id }) => `${PATH.CATEGORY}/${id}`,
        }),
        getRecipe: build.query<RecipeType, CategoryPath>({
            query: ({ id }) => `${PATH.RECIPE}/${id}`,
            providesTags: (_, __, { id }) => [{ type: RECIPE, id }],
        }),
        getMeasureUnits: build.query<MeasureUnitsResponse, void>({
            query: () => ({ url: PATH.MEASURE_INITS }),
        }),
        getRecipeByCategory: build.query<RecipeTypeResponse, RecipesCategoryQueryParams>({
            query: ({ id, page, limit, allergens, searchString }) => {
                const params = new URLSearchParams();

                if (limit !== undefined) {
                    params.append('limit', String(limit));
                }
                if (page !== undefined) {
                    params.append('page', String(page));
                }
                if (allergens) {
                    params.append('allergens', allergens);
                }
                if (searchString) {
                    params.append('searchString', searchString);
                }

                const queryString = params.toString() ? `?${params.toString()}` : '';
                return `${PATH.RECIPE}/${PATH.CATEGORY}/${id}${queryString}`;
            },
        }),
        getRecipes: build.query<RecipeTypeResponse, RecipesQueryParams>({
            query: ({
                limit,
                page,
                sortBy,
                sortOrder,
                subcategoriesIds,
                allergens,
                searchString,
                meat,
                garnish,
            }) => {
                const params = new URLSearchParams({ limit: String(limit) });

                if (sortBy) {
                    params.append('sortBy', sortBy);
                }
                if (page) {
                    params.append('page', page + '');
                }
                if (sortOrder) {
                    params.append('sortOrder', sortOrder);
                }
                if (subcategoriesIds) {
                    params.append('subcategoriesIds', subcategoriesIds);
                }
                if (allergens) {
                    params.append('allergens', allergens);
                }
                if (searchString) {
                    params.append('searchString', searchString);
                }
                if (meat) {
                    params.append('meat', meat);
                }
                if (garnish) {
                    params.append('garnish', garnish);
                }

                return `recipe?${params.toString()}`;
            },
            providesTags: (result) =>
                result && Array.isArray(result.data)
                    ? [
                          { type: RECIPE, id: LIST },
                          ...result.data.map((recipe) => ({ type: RECIPE, id: recipe._id })),
                      ]
                    : [{ type: RECIPE, id: LIST }],
        }),

        getRecipesByUser: build.query<RecipeBlogger, { id: string }>({
            query: ({ id }) => `${PATH.RECIPE}/${PATH.USER}/${id}`,
        }),

        uploadFile: build.mutation<UploadFileResponse, UploadFileData>({
            query: ({ file }) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: PATH.FILE_UPLOAD,
                    method: 'POST',
                    body: formData,
                };
            },
        }),

        createRecipe: build.mutation<RecipeResponse, RecipeFormValues>({
            query: (data) => ({
                url: PATH.RECIPE,
                method: 'POST',
                body: data,
            }),
        }),

        updateRecipe: build.mutation<RecipeResponse, { id: string; data: RecipeFormValues }>({
            query: ({ id, data }) => ({
                url: `${PATH.RECIPE}/${id}`,
                method: 'PATCH',
                body: data,
            }),
        }),

        saveDraft: build.mutation<void, DraftRecipeFormValues>({
            query: (data) => ({
                url: `${PATH.RECIPE}/${PATH.DRAFT}`,
                method: 'POST',
                body: data,
            }),
        }),

        deleteRecipe: build.mutation<void, RecipeId>({
            query: ({ id }) => ({
                url: `${PATH.RECIPE}/${id}`,
                method: 'DELETE',
            }),
        }),

        likeRecipe: build.mutation<void, RecipeId>({
            query: ({ id }) => ({
                url: `${PATH.RECIPE}/${id}/${PATH.LIKE}`,
                method: 'POST',
            }),
            invalidatesTags: (_, __, { id }) => [{ type: RECIPE, id }],
        }),

        bookmark: build.mutation<void, RecipeId>({
            query: ({ id }) => ({
                url: `${PATH.RECIPE}/${id}/${PATH.BOOKMARK}`,
                method: 'POST',
            }),
            invalidatesTags: (_, __, { id }) => [{ type: RECIPE, id }],
        }),

        refresh: build.query<Response, void>({
            query: () => ({
                url: PATH.AUTH_REFRESH,
                method: 'GET',
                credentials: 'include',
            }),
        }),
        check: build.query<Response, void>({
            query: () => ({
                url: PATH.AUTH_CHECK_AUTH,
                method: 'GET',
                credentials: 'include',
            }),
        }),
        registration: build.mutation<Response, RegistrationData>({
            query: (data) => ({
                url: PATH.AUTH_SIGNUP,
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
        }),
        login: build.mutation<Response, LoginDataType>({
            query: (data) => ({
                url: PATH.AUTH_LOGIN,
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                const result = await queryFulfilled;
                const accessToken = result.meta?.response?.headers.get('Authentication-Access');
                const oldToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

                if (accessToken && accessToken !== oldToken) {
                    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);
                    const [_, payload] = accessToken.split('.');
                    const decodedPayload = JSON.parse(atob(payload)) as DecodedAccessToken;
                    localStorage.setItem(STORAGE_KEY.DECODED_PAYLOAD, decodedPayload.userId);
                }
            },
        }),
        forgotPassword: build.mutation<Response, ForgotPasswordData>({
            query: (data) => ({
                url: PATH.AUTH_FORGOT_PASSWORD,
                method: 'POST',
                body: data,
            }),
        }),
        verifyOtp: build.mutation<Response, VerifyOtpData>({
            query: (data) => ({
                url: PATH.AUTH_VERIFY_OTP,
                method: 'POST',
                body: data,
            }),
        }),
        resetPassword: build.mutation<Response, ResetPasswordData>({
            query: (data) => ({
                url: PATH.AUTH_RESET_PASSWORD,
                method: 'POST',
                body: data,
            }),
        }),
        getBloggers: build.query<AuthorData, { limit: string }>({
            query: ({ limit }) => {
                const userId = localStorage.getItem(STORAGE_KEY.DECODED_PAYLOAD) ?? '';
                const params = new URLSearchParams({ currentUserId: String(userId) });
                params.append('limit', String(limit));
                return {
                    url: `${PATH.BLOGGERS}?${params.toString()}`,
                };
            },
            providesTags: (result) => {
                if (result && (result.others || result.favorites)) {
                    const allBloggers = [...(result.others || []), ...(result.favorites || [])];
                    const uniqueTags = Array.from(
                        new Set(allBloggers.map((blogger) => blogger._id)),
                    ).map((id) => ({ type: BLOGGERS, id }));
                    return [...uniqueTags, { type: BLOGGERS, id: LIST }];
                }
                return [{ type: BLOGGERS, id: LIST }];
            },
        }),
        getBlogger: build.query<BloggerData, RecipeId>({
            query: ({ id }) => {
                const userId = localStorage.getItem(STORAGE_KEY.DECODED_PAYLOAD) ?? '';
                const params = new URLSearchParams({ currentUserId: String(userId) });
                return {
                    url: `${PATH.BLOGGERS}/${id}?${params.toString()}`,
                };
            },
            providesTags: (_, __, { id }) => [{ type: BLOGGERS, id }],
        }),

        toggleSubscription: build.mutation<BloggerData, ToggleSubscriptionRequest>({
            query: ({ toUserId, fromUserId }) => ({
                url: `${PATH.USERS}/${PATH.TOGGLE_SUBSCRIPTION}`,
                method: 'PATCH',
                body: { toUserId: String(toUserId), fromUserId: String(fromUserId) },
            }),
            invalidatesTags: (_, __, { toUserId }) => [
                { type: BLOGGERS, id: LIST },
                { type: BLOGGERS, id: toUserId },
            ],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetRecipesQuery,
    useLazyGetRecipesQuery,
    useGetRecipeQuery,
    useLazyGetRecipeQuery,
    useGetRecipeByCategoryQuery,
    useLazyGetRecipeByCategoryQuery,
    useRegistrationMutation,
    useLoginMutation,
    useCheckQuery,
    useLazyRefreshQuery,
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
    useGetMeasureUnitsQuery,
    useUploadFileMutation,
    useCreateRecipeMutation,
    useDeleteRecipeMutation,
    useUpdateRecipeMutation,
    useSaveDraftMutation,
    useBookmarkMutation,
    useLikeRecipeMutation,
    useGetBloggersQuery,
    useLazyGetBloggersQuery,
    useLazyGetBloggerQuery,
    useGetBloggerQuery,
    useToggleSubscriptionMutation,
    useGetRecipesByUserQuery,
} = apiSlice;
