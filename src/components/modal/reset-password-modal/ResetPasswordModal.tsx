import { useResetPasswordMutation } from '~/store/slice/api/api-slice';

import { ResetPasswordWithLoader } from './ResetPasswordContent';

type ResetPasswordType = {
    isOpen: boolean;
    onClose: () => void;
    onOpenNextModule: () => void;
};

export const ResetPasswordModal = ({ isOpen, onClose, onOpenNextModule }: ResetPasswordType) => {
    const [resetPassword, { isLoading, isError }] = useResetPasswordMutation();
    return (
        <ResetPasswordWithLoader
            isLoading={isLoading}
            resetPassword={resetPassword}
            isError={isError}
            isOpen={isOpen}
            onClose={onClose}
            onOpenNextModule={onOpenNextModule}
        />
    );
};
