import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserNewPassword } from '../../type/User.ts';

type InitialState = {
    saveUserNewPassword: UserNewPassword;
};

const initialState: InitialState = {
    saveUserNewPassword: { password: '' },
};

const saveDataUserNewPassword = createSlice({
    name: 'save new password',
    initialState,
    reducers: {
        saveDataNewPassword: (state, action: PayloadAction<UserNewPassword>) => {
            state.saveUserNewPassword = action.payload;
        },
    },
});

export default saveDataUserNewPassword.reducer;
export const { saveDataNewPassword } = saveDataUserNewPassword.actions;
