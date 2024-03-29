import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InfoUser } from '../../type/User.ts';

type InitialState = {
    info: InfoUser;
};

const initialState: InitialState = {
    info: {},
};

const saveDataInfo = createSlice({
    name: 'save data user',
    initialState,
    reducers: {
        saveInfoUser: (state, action: PayloadAction<InfoUser>) => {
            state.info = action.payload;
        },
    },
});

export default saveDataInfo.reducer;
export const { saveInfoUser } = saveDataInfo.actions;
