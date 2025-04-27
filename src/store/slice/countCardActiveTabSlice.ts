import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    countCard: number;
};

const initialState: InitialState = {
    countCard: 0,
};

const countCardActiveTabSlice = createSlice({
    name: 'count card active tab',
    initialState,
    reducers: {
        setCountCard: (state, action: PayloadAction<number>) => {
            state.countCard = action.payload;
        },
    },
});

export default countCardActiveTabSlice.reducer;
export const { setCountCard } = countCardActiveTabSlice.actions;
