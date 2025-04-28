import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    zIndexLess: boolean;
};

const initialState: InitialState = {
    zIndexLess: false,
};

const headerZIndexSlice = createSlice({
    name: 'navigation button index',
    initialState,
    reducers: {
        setZIndex: (state, action: PayloadAction<boolean>) => {
            state.zIndexLess = action.payload;
        },
    },
});

export default headerZIndexSlice.reducer;
export const { setZIndex } = headerZIndexSlice.actions;
