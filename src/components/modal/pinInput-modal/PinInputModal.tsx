import {
    Box,
    HStack,
    Icon,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    PinInput,
    PinInputField,
    Text,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { peopleOnChair } from '~/assets/images/modal-mage';
import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import { CloseRoundModule } from '~/components/icons/CloseRoundModule';
import { Overlay } from '~/components/overlay/Overlay';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { useHandleError } from '~/hooks/useErrorHandler';
import { getSaveEmail } from '~/store/selectors/saveEmailSliceSelector';
import { useVerifyOtpMutation } from '~/store/slice/api/api-slice';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';

import styles from './PinInputModal.module.css';

type PinInputModalType = {
    isOpen: boolean;
    onClose: () => void;
    isOpenNextModule: () => void;
};

export const PinInputModal = ({ isOpen, onClose, isOpenNextModule }: PinInputModalType) => {
    const email = useSelector(getSaveEmail);
    const [verifyOtp, { isLoading, isError }] = useVerifyOtpMutation();
    const [isOtpFailedOpen, setIsOtpFailedOpen] = useState(isError);
    const [notification, setNotification] = useState('');
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [pinError, setPinError] = useState(false);
    const firstInputRef = useRef<HTMLInputElement>(null);

    const spamMessage = <>Не пришло письмо? Проверьте&nbsp;папку&nbsp;Спам.</>;
    const confirmationMessage = (
        <>
            {' '}
            Мы отправили вам на e-mail <br />
            <Text as='span' fontWeight='700'>
                {' '}
                {email}
            </Text>{' '}
            <br /> шестизначный код. Введите&nbsp;его&nbsp;ниже.
        </>
    );
    const errorCode = 'Неверный код';
    const handleError = useHandleError(setTitle, setNotification, 'otp');

    const handlePinChange = (value: string) => {
        setCode(value);
        if (pinError) {
            setPinError(false);
        }
    };

    const handleComplete = async (data: string) => {
        setPinError(false);
        setCode('');
        try {
            await verifyOtp({ email: email, otpToken: data }).unwrap();
            onClose();
            isOpenNextModule();
            close();
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                if (error.status === 403) {
                    setPinError(true);
                    setIsOtpFailedOpen(false);
                    if (firstInputRef.current) {
                        firstInputRef.current.focus();
                    }
                } else {
                    handleError(error);
                    setIsOtpFailedOpen(true);
                }
            }
        }
    };

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backgroundColor='alpha.300' backdropFilter='blur(4px)' />
            <ModalContent
                maxW={{ base: '316px', bp115: '396px' }}
                borderRadius='16px'
                alignItems='center'
                m={0}
                data-test-id={DATA_TEST_ID.VERIFICATION_CODE_MODAL}
            >
                <Image src={peopleOnChair} boxSize={{ base: '108px', bp115: '206px' }} mt={8} />
                <Icon
                    as={CloseRoundModule}
                    position='absolute'
                    top={6}
                    right={6}
                    boxSize={6}
                    onClick={onClose}
                    data-test-id={DATA_TEST_ID.CLOSE_BUTTON}
                />
                <ModalBody p={8} w='100%' px={0}>
                    <Text
                        className={styles.text}
                        textAlign='center'
                        pb={4}
                        whiteSpace='pre-line'
                        px={5}
                    >
                        {confirmationMessage}
                    </Text>
                    <HStack justify='center'>
                        <PinInput
                            placeholder='O'
                            onComplete={handleComplete}
                            value={code}
                            onChange={handlePinChange}
                        >
                            {Array.from({ length: 6 }, (_, index) => (
                                <PinInputField
                                    key={index}
                                    className={styles.pin_input}
                                    borderColor={pinError ? 'red' : 'alpha.100'}
                                    ref={index === 0 ? firstInputRef : undefined}
                                    data-test-id={`${DATA_TEST_ID.VERIFICATION_CODE_INPUT}${index + 1}`}
                                />
                            ))}
                        </PinInput>
                    </HStack>
                    {pinError ? (
                        <Text textAlign='center' className={styles.message} color='red.500' my={1}>
                            {errorCode}
                        </Text>
                    ) : (
                        <Box h={6}></Box>
                    )}
                    <Text textAlign='center' className={styles.advice} mx='30px'>
                        {spamMessage}
                    </Text>
                </ModalBody>
                {isOtpFailedOpen && (
                    <ErrorModal
                        onClose={() => setIsOtpFailedOpen(false)}
                        title={title}
                        notification={notification}
                    />
                )}
            </ModalContent>
            {isLoading && <Overlay />}
        </Modal>
    );
};
