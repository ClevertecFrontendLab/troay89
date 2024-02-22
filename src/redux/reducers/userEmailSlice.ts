import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserCheckEmail } from '../../type/User.ts';

type InitialState = {
    saveUserEmail: UserCheckEmail;
};

const initialState: InitialState = {
    saveUserEmail: { email: '' },
};

const saveDataUserEmail = createSlice({
    name: 'saveDataUserEmail',
    initialState,
    reducers: {
        saveDataEmail: (state, action: PayloadAction<UserCheckEmail>) => {
            state.saveUserEmail = action.payload;
        },
    },
});

export default saveDataUserEmail.reducer;
export const { saveDataEmail } = saveDataUserEmail.actions;
