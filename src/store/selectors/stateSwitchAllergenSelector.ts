import { ApplicationState } from '../configure-store';

export const getStateSwitchAllergen = (state: ApplicationState) =>
    state.getStateSwitchAllergen.state;
