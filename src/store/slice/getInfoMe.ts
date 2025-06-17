import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserProfile = {
    firstName: string;
    secondName: string;
    email: string;
    avatar?: string;
    subscribers: number;
    likes: number;
    bookmarks: number;
};

const initialState: UserProfile = {
    firstName: '',
    secondName: '',
    email: '',
    avatar: '',
    subscribers: 0,
    likes: 0,
    bookmarks: 0,
};

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setUserProfile: (_, action: PayloadAction<UserProfile>) => action.payload,

        updateFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
        },
        updateSecondName: (state, action: PayloadAction<string>) => {
            state.secondName = action.payload;
        },
        updateEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        updateAvatar: (state, action: PayloadAction<string>) => {
            state.avatar = action.payload;
        },
        updateLikes: (state, action: PayloadAction<number>) => {
            state.likes = action.payload;
        },
        updateSubscribers: (state, action: PayloadAction<number>) => {
            state.subscribers = action.payload;
        },
        updateBookmarks: (state, action: PayloadAction<number>) => {
            state.bookmarks = action.payload;
        },
    },
});

export const {
    setUserProfile,
    updateFirstName,
    updateSecondName,
    updateEmail,
    updateAvatar,
    updateLikes,
    updateBookmarks,
    updateSubscribers,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
