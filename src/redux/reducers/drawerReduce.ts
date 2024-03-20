import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataTraining } from '../../type/Training.ts';

type InitialState = {
    listDrawerTraining: DataTraining[];
};

const initialState: InitialState = {
    listDrawerTraining: [
        { name: '', replays: undefined, weight: undefined, approaches: undefined },
    ],
};

const listTrainingSlice = createSlice({
    name: 'save personal training list',
    initialState,
    reducers: {
        saveDrawerTraining: (state, action: PayloadAction<DataTraining[]>) => {
            state.listDrawerTraining = action.payload;
        },
    },
});

export default listTrainingSlice.reducer;
export const { saveDrawerTraining } = listTrainingSlice.actions;
