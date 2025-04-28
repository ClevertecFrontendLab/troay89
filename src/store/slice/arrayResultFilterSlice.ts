import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    resultFilter: string[];
    listCategory: string[];
    listAuthors: string[];
    listTypeMeats: string[];
    listTypeDishes: string[];
    resultSearch: string;
};

const initialState: InitialState = {
    resultFilter: [],
    listCategory: [],
    listAuthors: [],
    listTypeMeats: [],
    listTypeDishes: [],
    resultSearch: '',
};

const arrayResultFilterSlice = createSlice({
    name: 'array result filter',
    initialState,
    reducers: {
        setResultFilter: (state, action: PayloadAction<string[]>) => {
            state.resultFilter = action.payload;
        },
        setListCategory: (state, action: PayloadAction<string[]>) => {
            state.listCategory = action.payload;
        },
        setListAuthors: (state, action: PayloadAction<string[]>) => {
            state.listAuthors = action.payload;
        },
        setListTypeMeats: (state, action: PayloadAction<string[]>) => {
            state.listTypeMeats = action.payload;
        },
        setListTypeDishes: (state, action: PayloadAction<string[]>) => {
            state.listTypeDishes = action.payload;
        },
        setResultSearch: (state, action: PayloadAction<string>) => {
            state.resultSearch = action.payload;
        },
    },
});

export default arrayResultFilterSlice.reducer;
export const {
    setResultFilter,
    setListCategory,
    setListTypeMeats,
    setListTypeDishes,
    setListAuthors,
    setResultSearch,
} = arrayResultFilterSlice.actions;
