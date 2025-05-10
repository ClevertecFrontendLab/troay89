import { ApplicationState } from '../configure-store';

export const currentIndexSelector = (state: ApplicationState) => state.indexTabs.index;
export const idRecipeSelector = (state: ApplicationState) => state.indexTabs.idRecipe;
export const nameRecipeSelector = (state: ApplicationState) => state.indexTabs.title;
export const activeSubcategoryIdSelector = (state: ApplicationState) =>
    state.indexTabs.activeSubcategoryId;
export const indexNavigationButtonSelector = (state: ApplicationState) =>
    state.indexTabs.indexCategory;
