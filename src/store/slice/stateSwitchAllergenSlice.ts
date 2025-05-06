import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    state: boolean;
};

const initialState: InitialState = {
    state: false,
};

const stateSwitchAllergen = createSlice({
    name: 'state switch allergen',
    initialState,
    reducers: {
        setStateSwitch: (state, action: PayloadAction<boolean>) => {
            state.state = action.payload;
        },
    },
});

export default stateSwitchAllergen.reducer;
export const { setStateSwitch } = stateSwitchAllergen.actions;
