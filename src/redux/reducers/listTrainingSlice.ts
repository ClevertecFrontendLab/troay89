import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KindDataTraining } from '../../type/Training.ts';

type InitialState = {
    listTraining: KindDataTraining;
};

const initialState: InitialState = {
    listTraining: { kindTraining: '', date: '', data: [] },
};

const listTrainingSlice = createSlice({
    name: 'save training list',
    initialState,
    reducers: {
        saveListTraining: (state, action: PayloadAction<KindDataTraining>) => {
            state.listTraining = action.payload;
        },
    },
});

export default listTrainingSlice.reducer;
export const { saveListTraining } = listTrainingSlice.actions;
