import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataTraining } from '../../type/Training.ts';

type InitialState = {
    listDrawerTraining: DataTraining[];
};

const initialState: InitialState = {
    listDrawerTraining: [{ name: '', replays: 0, weight: 0, approaches: 0 }],
};

type Training = {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
};

const defaultExercises = [
    {
        name: '',
        approaches: 3,
        weight: 0,
        replays: 1,
    },
];

const listTrainingSlice = createSlice({
    name: 'save personal training list',
    initialState,
    reducers: {
        saveDrawerTraining: (state, action: PayloadAction<DataTraining[]>) => {
            state.listDrawerTraining = action.payload;
        },
        saveDrawerTrainingField(
            state,
            { payload }: PayloadAction<Partial<Training> & { index: number }>,
        ) {
            state.listDrawerTraining[payload.index] = {
                ...state.listDrawerTraining[payload.index],
                ...payload,
            };
        },
        addExercises(state) {
            state.listDrawerTraining.push(...defaultExercises);
        },
        deleteExercises(state, { payload: indexes }: PayloadAction<number[]>) {
            state.listDrawerTraining = state.listDrawerTraining.filter(
                (_, index) => !indexes.includes(index),
            );
        },
    },
});

export default listTrainingSlice.reducer;
export const { saveDrawerTraining, saveDrawerTrainingField, addExercises, deleteExercises } =
    listTrainingSlice.actions;
