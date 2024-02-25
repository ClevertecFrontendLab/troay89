import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../type/User.ts';

type InitialState = {
    saveDataUser: User;
};

const initialState: InitialState = {
    saveDataUser: { email: '', password: '' },
};

const saveData = createSlice({
    name: 'saveDataUser',
    initialState,
    reducers: {
        saveDataUser: (state, action: PayloadAction<User>) => {
            state.saveDataUser = action.payload;
        },
    },
});

export default saveData.reducer;
export const { saveDataUser } = saveData.actions;
