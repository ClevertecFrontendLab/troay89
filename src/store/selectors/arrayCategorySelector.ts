import { ApplicationState } from '../configure-store';

export const getArrayCategorySelector = (state: ApplicationState) =>
    state.setArrayCategory.arrayCategory;
