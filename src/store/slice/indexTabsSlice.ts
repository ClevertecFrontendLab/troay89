import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    index: number | undefined;
};

const initialState: InitialState = {
    index: undefined,
};

const indexTabsSlice = createSlice({
    name: 'tab index',
    initialState,
    reducers: {
        setIndexTab: (state, action: PayloadAction<number>) => {
            state.index = action.payload;
        },
    },
});

export default indexTabsSlice.reducer;
export const { setIndexTab } = indexTabsSlice.actions;
