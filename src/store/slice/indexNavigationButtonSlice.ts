import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    index: number | undefined;
};

const initialState: InitialState = {
    index: undefined,
};

const indexNavigationButtonSlice = createSlice({
    name: 'navigation button index',
    initialState,
    reducers: {
        setIndexButton: (state, action: PayloadAction<number>) => {
            state.index = action.payload;
        },
    },
});

export default indexNavigationButtonSlice.reducer;
export const { setIndexButton } = indexNavigationButtonSlice.actions;
