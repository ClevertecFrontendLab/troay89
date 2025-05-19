import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Icon,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { noExit } from '~/assets/images/modal-mage';
import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import { CloseRoundModule } from '~/components/icons/CloseRoundModule';
import { Overlay } from '~/components/overlay/Overlay';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { ERROR_MESSAGE } from '~/constants/errorMessage';
import { useForgotPasswordMutation } from '~/store/slice/api/api-slice';
import { setSaveEmail } from '~/store/slice/saveEmailSlice';
import { handleBlurTrim } from '~/utils/TrimOnBlur';

import styles from './PasswordRecovery.module.css';
import { passwordRecovery, PasswordRecoveryData } from './PasswordRecoverySchema';

type LoginFailedModuleType = {
    isOpen: boolean;
    onClose: () => void;
    isOpenNextModule: () => void;
};

export const PasswordRecovery = ({ isOpen, onClose, isOpenNextModule }: LoginFailedModuleType) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<PasswordRecoveryData>({
        resolver: yupResolver(passwordRecovery),
        mode: 'onBlur',
    });
    const [forgotPassword, { isLoading, isError }] = useForgotPasswordMutation();
    const [title, setTitle] = useState('');
    const [notification, setNotification] = useState('');
    const [isVerificationFailedOpen, setIsVerificationFailedOpen] = useState(isError);
    const message =
        'Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код';

    useEffect(() => {
        if (!isOpen) {
            reset({ email: '' });
        }
    }, [isOpen, reset]);

    const onSubmit = async (data: PasswordRecoveryData) => {
        try {
            await forgotPassword(data).unwrap();
            onClose();
            isOpenNextModule();
            dispatch(setSaveEmail(data.email));
        } catch (err) {
            reset({ email: '' });
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as FetchBaseQueryError;
                setIsVerificationFailedOpen(true);
                if (error.status === 400) {
                    setTitle(ERROR_MESSAGE.WAIT_MINUTE);
                    setNotification('');
                }
                if (error.status === 403) {
                    setTitle(ERROR_MESSAGE.EMAIL_NOT_EXITS);
                    setNotification(ERROR_MESSAGE.EMAIL_NOT_EXITS_NOTIFICATION);
                }
                if (typeof error.status === 'number' && error.status >= 500) {
                    setTitle(ERROR_MESSAGE.ERROR_SERVER);
                    setNotification(ERROR_MESSAGE.ERROR_SERVER_NOTIFICATION);
                }
            }
        }
    };

    const emailRegister = register('email');

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} autoFocus={false}>
            <ModalOverlay backgroundColor='alpha.300' backdropFilter='blur(4px)' />
            <ModalContent
                maxW={{ base: '316px', bp115: '396px' }}
                alignItems='center'
                m={0}
                borderRadius='16px'
                data-test-id={DATA_TEST_ID.SEND_EMAIL_MODAL}
            >
                <Image src={noExit} boxSize={{ base: '108px', bp115: '206px' }} mt={8} />
                <Icon
                    as={CloseRoundModule}
                    position='absolute'
                    top={6}
                    right={6}
                    boxSize={6}
                    onClick={onClose}
                    data-test-id={DATA_TEST_ID.CLOSE_BUTTON}
                />
                <ModalBody p={8} w='100%'>
                    <Text
                        className={styles.text}
                        textAlign='center'
                        pb={4}
                        whiteSpace='pre-line'
                        px={5}
                    >
                        {message}
                    </Text>
                    <VStack as='form' spacing={0} w='full' onSubmit={handleSubmit(onSubmit)}>
                        <FormControl id='email'>
                            <FormLabel className={styles.form_control} mb={1}>
                                Ваш e-mail
                            </FormLabel>
                            <Input
                                className={styles.form_input}
                                type='email'
                                placeholder='e-mail'
                                bg='white'
                                size='lg'
                                _focus={{ boxShadow: 'none' }}
                                borderColor={
                                    errors.email || isVerificationFailedOpen ? 'red' : 'lime.150'
                                }
                                {...register('email')}
                                onBlur={(e) =>
                                    handleBlurTrim(e, 'email', setValue, emailRegister.onBlur)
                                }
                                data-test-id={DATA_TEST_ID.EMAIL_INPUT}
                            />
                            {errors.email ? (
                                <Text className={styles.message} color='red.500' mt={1} mb={1}>
                                    {errors.email.message}
                                </Text>
                            ) : (
                                <Box h={6}></Box>
                            )}
                        </FormControl>

                        <Button
                            className={styles.button}
                            maxW='100%'
                            width='100%'
                            px={0}
                            bg='alpha.900'
                            color='white'
                            size='lg'
                            colorScheme='teal'
                            type='submit'
                            mb={6}
                            data-test-id={DATA_TEST_ID.SUBMIT_BUTTON}
                        >
                            Получить код
                        </Button>
                    </VStack>

                    <Text textAlign='center' className={styles.secondMessage}>
                        Не пришло письмо? Проверьте папку Спам.
                    </Text>
                </ModalBody>
                {isVerificationFailedOpen && (
                    <ErrorModal
                        onClose={() => setIsVerificationFailedOpen(false)}
                        title={title}
                        notification={notification}
                    />
                )}
            </ModalContent>
            {isLoading && <Overlay />}
        </Modal>
    );
};
