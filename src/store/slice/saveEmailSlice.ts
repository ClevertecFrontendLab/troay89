import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    email: string;
};

const initialState: InitialState = {
    email: '',
};

const saveEmailSlice = createSlice({
    name: 'save email',
    initialState,
    reducers: {
        setSaveEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
    },
});

export default saveEmailSlice.reducer;
export const { setSaveEmail } = saveEmailSlice.actions;
