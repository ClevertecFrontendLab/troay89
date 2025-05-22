import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FirstPartUserState = {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
};

const initialState: FirstPartUserState = {
    firstName: null,
    lastName: null,
    email: null,
};

const firstPartDataCreateUser = createSlice({
    name: 'set first part data create user',
    initialState,
    reducers: {
        setFirstPartDataCreateUser: (_, action: PayloadAction<FirstPartUserState>) =>
            action.payload,
    },
});

export default firstPartDataCreateUser.reducer;
export const { setFirstPartDataCreateUser } = firstPartDataCreateUser.actions;
