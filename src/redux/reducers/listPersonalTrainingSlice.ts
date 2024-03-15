import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonalTraining } from '../../type/Training.ts';

type InitialState = {
    listPersonalTraining: PersonalTraining[];
};

const initialState: InitialState = {
    listPersonalTraining: [],
};

const listTrainingSlice = createSlice({
    name: 'save personal training list',
    initialState,
    reducers: {
        savePersonalListTraining: (state, action: PayloadAction<PersonalTraining[]>) => {
            state.listPersonalTraining = action.payload;
        },
    },
});

export default listTrainingSlice.reducer;
export const { savePersonalListTraining } = listTrainingSlice.actions;
