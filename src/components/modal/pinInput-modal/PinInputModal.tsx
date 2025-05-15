import {
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
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { peopleOnChair } from '~/assets/images/modal-mage';
import { ErrorModal } from '~/components/error-modal/ErrorModal';
import { CloseRoundModule } from '~/components/icons/CloseRoundModule';
import { Overlay } from '~/components/overlay/Overlay';
import { getSaveEmail } from '~/store/selectors/saveEmailSliceSelector';
import { useVerifyOtpMutation } from '~/store/slice/app-slice';

import styles from './PinInputModal.module.css';

type PinInputModalType = {
    isOpen: boolean;
    onClose: () => void;
    isOpenNextModule: () => void;
};

export const PinInputModal = ({ isOpen, onClose, isOpenNextModule }: PinInputModalType) => {
    const [code, setCode] = useState('');
    const email = useSelector(getSaveEmail);
    const [verifyOtp, { isLoading, isError }] = useVerifyOtpMutation();
    const [isOtpFailedOpen, setIsOtpFailedOpen] = useState(isError);
    const [notification, setNotification] = useState('');
    const [title, setTitle] = useState('');
    const firstInputRef = useRef<HTMLInputElement>(null);

    const handleComplete = async (data: string) => {
        setCode('');
        try {
            await verifyOtp({ email: email, otpToken: data }).unwrap();
            onClose();
            isOpenNextModule();
            close();
        } catch (err) {
            setIsOtpFailedOpen(true);
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as FetchBaseQueryError;
                if (typeof error.status === 'number' && error.status >= 500) {
                    setTitle('Ошибка сервера');
                    setNotification('Попробуйте немного позже');
                } else if (error.status === 403) {
                    setIsOtpFailedOpen(false);
                    if (firstInputRef.current) {
                        firstInputRef.current.focus();
                    }
                }
            }
        }
    };

    useEffect(() => {
        if (isOtpFailedOpen) {
            const timer = setTimeout(() => {
                setIsOtpFailedOpen(false);
            }, 15000);
            return () => clearTimeout(timer);
        }
    }, [isOtpFailedOpen]);

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backgroundColor='alpha.300' backdropFilter='blur(4px)' />
            <ModalContent
                maxW={{ base: '316px', bp115: '396px' }}
                borderRadius='16px'
                alignItems='center'
                m={0}
            >
                <Image src={peopleOnChair} boxSize={{ base: '108px', bp115: '206px' }} mt={8} />
                <Icon
                    as={CloseRoundModule}
                    position='absolute'
                    top={6}
                    right={6}
                    boxSize={6}
                    onClick={onClose}
                />
                <ModalBody p={8} w='100%' px={0}>
                    <Text
                        className={styles.text}
                        textAlign='center'
                        pb={4}
                        whiteSpace='pre-line'
                        px={5}
                    >
                        Мы отправили вам на e-mail <br />
                        <Text as='span' fontWeight='700'>
                            {' '}
                            {email}
                        </Text>{' '}
                        <br /> шестизначный код. Введите&nbsp;его&nbsp;ниже.
                    </Text>
                    <HStack justify='center' pb={6}>
                        <PinInput
                            placeholder='O'
                            onComplete={handleComplete}
                            value={code}
                            onChange={setCode}
                        >
                            <PinInputField
                                className={styles.pin_input}
                                borderColor={isError ? 'red' : 'alpha.100'}
                                ref={firstInputRef}
                            />
                            <PinInputField
                                className={styles.pin_input}
                                borderColor={isError ? 'red' : 'alpha.100'}
                            />
                            <PinInputField
                                className={styles.pin_input}
                                borderColor={isError ? 'red' : 'alpha.100'}
                            />
                            <PinInputField
                                className={styles.pin_input}
                                borderColor={isError ? 'red' : 'alpha.100'}
                            />
                            <PinInputField
                                className={styles.pin_input}
                                borderColor={isError ? 'red' : 'alpha.100'}
                            />
                            <PinInputField
                                className={styles.pin_input}
                                borderColor={isError ? 'red' : 'alpha.100'}
                            />
                        </PinInput>
                    </HStack>
                    <Text textAlign='center' className={styles.advice} mx='30px'>
                        Не пришло письмо? Проверьте&nbsp;папку&nbsp;Спам.
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
