import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    index: number | undefined;
    idRecipe: string | undefined;
};

const initialState: InitialState = {
    index: undefined,
    idRecipe: undefined,
};

const indexTabsSlice = createSlice({
    name: 'tab index',
    initialState,
    reducers: {
        setIndexTab: (state, action: PayloadAction<number>) => {
            state.index = action.payload;
        },
        setIndexRecipe: (state, action: PayloadAction<string>) => {
            state.idRecipe = action.payload;
        },
    },
});

export default indexTabsSlice.reducer;
export const { setIndexTab, setIndexRecipe } = indexTabsSlice.actions;
