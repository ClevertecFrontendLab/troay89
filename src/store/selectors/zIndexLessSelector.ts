import { ApplicationState } from '../configure-store';

export const zIndexLessSelector = (state: ApplicationState) => state.headerZIndex.zIndexLess;
