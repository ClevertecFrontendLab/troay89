import { useForgotPasswordMutation } from '~/store/slice/api/api-slice';

import { PasswordRecoveryWithLoader } from './PasswordRecoveryConent';

type LoginFailedModuleType = {
    isOpen: boolean;
    onClose: () => void;
    onOpenNextModule: () => void;
};

export const PasswordRecoveryModal = ({
    isOpen,
    onClose,
    onOpenNextModule,
}: LoginFailedModuleType) => {
    const [forgotPassword, { isLoading, isError }] = useForgotPasswordMutation();
    return (
        <PasswordRecoveryWithLoader
            isLoading={isLoading}
            forgotPassword={forgotPassword}
            isError={isError}
            isOpen={isOpen}
            onClose={onClose}
            onOpenNextModule={onOpenNextModule}
        />
    );
};
