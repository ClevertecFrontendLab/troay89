import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonalTraining } from '../../type/Training.ts';

type InitialState = {
    listPersonalTraining: PersonalTraining | null;
};

const initialState: InitialState = {
    listPersonalTraining: null,
};

const editTrainingSlice = createSlice({
    name: 'edit personal training',
    initialState,
    reducers: {
        editPersonalTraining: (state, action: PayloadAction<PersonalTraining | null>) => {
            state.listPersonalTraining = action.payload;
        },
    },
});

export default editTrainingSlice.reducer;
export const { editPersonalTraining } = editTrainingSlice.actions;
