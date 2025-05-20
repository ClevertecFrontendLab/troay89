import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CategoriesResponse } from '~/type/category';

type InitialState = {
    arrayCategory: CategoriesResponse;
};

const initialState: InitialState = {
    arrayCategory: [],
};

const getArrayCategorySlice = createSlice({
    name: 'array categories response',
    initialState,
    reducers: {
        setArrayCategory: (state, action: PayloadAction<CategoriesResponse>) => {
            state.arrayCategory = action.payload;
        },
    },
});

export default getArrayCategorySlice.reducer;
export const { setArrayCategory } = getArrayCategorySlice.actions;
