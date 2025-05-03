import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    index: number | undefined;
    idRecipe: string | undefined;
    activeSubcategoryId: string | null;
    title: string | null;
};

const initialState: InitialState = {
    index: undefined,
    idRecipe: undefined,
    activeSubcategoryId: null,
    title: null,
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
        setNameRecipe: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setActiveSubcategoryId(state, action: PayloadAction<string>) {
            state.activeSubcategoryId = action.payload;
        },
    },
});

export default indexTabsSlice.reducer;
export const { setIndexTab, setIndexRecipe, setActiveSubcategoryId, setNameRecipe } =
    indexTabsSlice.actions;
