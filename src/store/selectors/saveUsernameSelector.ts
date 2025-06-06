import { ApplicationState } from '../configure-store';

export const getSaveUsername = (state: ApplicationState) => state.saveUsername.username;
