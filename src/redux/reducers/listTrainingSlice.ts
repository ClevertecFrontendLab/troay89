import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataTraining } from '../../type/Training.ts';

type InitialState = {
    listTraining: DataTraining[];
};

const initialState: InitialState = {
    listTraining: [],
};

const listTrainingSlice = createSlice({
    name: 'save training list',
    initialState,
    reducers: {
        saveListTraining: (state, action: PayloadAction<DataTraining[]>) => {
            state.listTraining = action.payload;
        },
    },
});

export default listTrainingSlice.reducer;
export const { saveListTraining } = listTrainingSlice.actions;
