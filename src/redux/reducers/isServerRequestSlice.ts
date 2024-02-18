import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    isServerRequest: boolean;
};

const initialState: InitialState = {
    isServerRequest: false,
};

const serverRequest = createSlice({
    name: 'isServerRequest',
    initialState,
    reducers: {
        changeRequest: (state, action: PayloadAction<boolean>) => {
            state.isServerRequest = action.payload;
        },
    },
});

export default serverRequest.reducer;
export const { changeRequest } = serverRequest.actions;
