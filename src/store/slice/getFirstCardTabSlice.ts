import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import RecipeType from '~/type/RecipeType';

type InitialState = {
    listRecipes: RecipeType[];
};

const initialState: InitialState = {
    listRecipes: [],
};

const getFirstCardTabSlice = createSlice({
    name: 'list recipes for first loading',
    initialState,
    reducers: {
        setListRecipe: (state, action: PayloadAction<RecipeType[]>) => {
            state.listRecipes = action.payload;
        },
    },
});

export default getFirstCardTabSlice.reducer;
export const { setListRecipe } = getFirstCardTabSlice.actions;
