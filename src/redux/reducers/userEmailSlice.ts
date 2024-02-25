import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    saveUserEmail: string;
};

const initialState: InitialState = {
    saveUserEmail: '',
};

const saveDataUserEmail = createSlice({
    name: 'saveDataUserEmail',
    initialState,
    reducers: {
        saveDataEmail: (state, action: PayloadAction<string>) => {
            state.saveUserEmail = action.payload;
        },
    },
});

export default saveDataUserEmail.reducer;
export const { saveDataEmail } = saveDataUserEmail.actions;
