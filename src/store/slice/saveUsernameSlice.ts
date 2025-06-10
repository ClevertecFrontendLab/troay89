import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    username: string;
};

const initialState: InitialState = {
    username: '',
};

const saveUsernameSlice = createSlice({
    name: 'save username',
    initialState,
    reducers: {
        setSaveUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
    },
});

export default saveUsernameSlice.reducer;
export const { setSaveUsername } = saveUsernameSlice.actions;
