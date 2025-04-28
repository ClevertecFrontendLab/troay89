import { ApplicationState } from '../configure-store';

export const countCardActiveTabSelector = (state: ApplicationState) =>
    state.countCardActiveTab.countCard;
