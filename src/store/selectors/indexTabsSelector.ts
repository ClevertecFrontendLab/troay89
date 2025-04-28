import { ApplicationState } from '../configure-store';

export const currentIndexSelector = (state: ApplicationState) => state.indexTabs.index;
export const idRecipeSelector = (state: ApplicationState) => state.indexTabs.idRecipe;
