import { ApplicationState } from '../configure-store';

export const indexNavigationButtonSelector = (state: ApplicationState) =>
    state.indexNavigationButton.index;
