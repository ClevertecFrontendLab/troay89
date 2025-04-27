import { ApplicationState } from '../configure-store';

export const allergenFilterSelector = (state: ApplicationState) =>
    state.arrayResultFilter.resultFilter;
export const listCategorySelector = (state: ApplicationState) =>
    state.arrayResultFilter.listCategory;
export const listTypeMeatsSelector = (state: ApplicationState) =>
    state.arrayResultFilter.listTypeMeats;
export const listTypeDishesSelector = (state: ApplicationState) =>
    state.arrayResultFilter.listTypeDishes;
export const resultSearchSelector = (state: ApplicationState) =>
    state.arrayResultFilter.resultSearch;
