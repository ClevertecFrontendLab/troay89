import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
    title: string;
    notification: string;
    isShowModalLoginFailed: boolean;
    isOtpFailedOpen: boolean;
};

const initialState: AuthState = {
    title: '',
    notification: '',
    isShowModalLoginFailed: false,
    isOtpFailedOpen: false,
};

const authSlice = createSlice({
    name: 'authError',
    initialState,
    reducers: {
        setError(state, action) {
            state.title = action.payload.title;
            state.notification = action.payload.notification;
            state.isShowModalLoginFailed = action.payload.isShowModalLoginFailed ?? false;
            state.isOtpFailedOpen = action.payload.isOtpFailedOpen ?? false;
        },
        resetError(state) {
            state.title = '';
            state.notification = '';
            state.isShowModalLoginFailed = false;
            state.isOtpFailedOpen = false;
        },
    },
});

export const { setError, resetError } = authSlice.actions;
export default authSlice.reducer;
