import { ApplicationState } from '../configure-store';

export const authErrorTitleSelector = (state: ApplicationState) => state.authError.title;
export const authErrorNotificationSelector = (state: ApplicationState) =>
    state.authError.notification;
export const authIsShowModalLoginFailedSelector = (state: ApplicationState) =>
    state.authError.isShowModalLoginFailed;
export const authIsOtpFailedOpenSelector = (state: ApplicationState) =>
    state.authError.isOtpFailedOpen;
