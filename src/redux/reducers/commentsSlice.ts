import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comments } from '../../type/Data.ts';

type InitialState = {
    comments: Comments[];
};

const initialState: InitialState = {
    comments: [],
};

const saveDataComments = createSlice({
    name: 'save data comments',
    initialState,
    reducers: {
        saveComments: (state, action: PayloadAction<Comments[]>) => {
            state.comments = action.payload;
        },
    },
});

export default saveDataComments.reducer;
export const { saveComments } = saveDataComments.actions;
