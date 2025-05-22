import { useVerifyOtpMutation } from '~/store/slice/api/api-slice';

import { PinInputModalWithLoader } from './PinInputModalContent';

type PinInputModalType = {
    isOpen: boolean;
    onClose: () => void;
    onOpenNextModule: () => void;
};

export const PinInputModal = ({ isOpen, onClose, onOpenNextModule }: PinInputModalType) => {
    const [verifyOtp, { isLoading, isError }] = useVerifyOtpMutation();
    return (
        <PinInputModalWithLoader
            isLoading={isLoading}
            verifyOtp={verifyOtp}
            isError={isError}
            isOpen={isOpen}
            onClose={onClose}
            onOpenNextModule={onOpenNextModule}
        />
    );
};
