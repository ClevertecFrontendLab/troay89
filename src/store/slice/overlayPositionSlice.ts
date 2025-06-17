import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    position: boolean;
    isFetchingFilterRecipes: boolean;
    shouldShowFilterResults: boolean;
};

const initialState: InitialState = {
    position: true,
    isFetchingFilterRecipes: false,
    shouldShowFilterResults: false,
};

const getOverlayPosition = createSlice({
    name: 'overlay position',
    initialState,
    reducers: {
        setOverlayPosition: (state, action: PayloadAction<boolean>) => {
            state.position = action.payload;
        },
        setFetchingFilterRecipes(state, action: PayloadAction<boolean>) {
            state.isFetchingFilterRecipes = action.payload;
        },
        setShouldShowFilterResults(state, action: PayloadAction<boolean>) {
            state.shouldShowFilterResults = action.payload;
        },
    },
});

export default getOverlayPosition.reducer;
export const { setOverlayPosition, setFetchingFilterRecipes, setShouldShowFilterResults } =
    getOverlayPosition.actions;
