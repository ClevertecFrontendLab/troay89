import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    resultFilter: string[];
};

const initialState: InitialState = {
    resultFilter: [],
};

const arrayResultFilterSlice = createSlice({
    name: 'array result filter',
    initialState,
    reducers: {
        setResultFilter: (state, action: PayloadAction<string[]>) => {
            state.resultFilter = action.payload;
        },
    },
});

export default arrayResultFilterSlice.reducer;
export const { setResultFilter } = arrayResultFilterSlice.actions;
