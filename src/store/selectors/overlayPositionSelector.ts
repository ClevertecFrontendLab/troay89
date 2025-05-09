import { ApplicationState } from '../configure-store';

export const overlayPositionSelector = (state: ApplicationState) => state.getPosition.position;
export const fetchingFilterSelector = (state: ApplicationState) =>
    state.getPosition.isFetchingFilterRecipes;
export const shouldShowFilterResultsSelector = (state: ApplicationState) =>
    state.getPosition.shouldShowFilterResults;
