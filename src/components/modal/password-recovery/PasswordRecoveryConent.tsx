import {
    Button,
    Icon,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { noExit } from '~/assets/images/modal-mage';
import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import { CommonInputField } from '~/components/common-input-field/CommonInputField';
import { CloseRoundModule } from '~/components/icons/CloseRoundModule';
import { withLoader } from '~/components/with-loader/WithLoader';
import { AUTH_FORM } from '~/constants/authForm';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { useHandleError } from '~/hooks/useErrorHandler';
import { useForgotPasswordMutation } from '~/store/slice/api/api-slice';
import { setSaveEmail } from '~/store/slice/saveEmailSlice';
import { handleBlurTrim } from '~/utils/TrimOnBlur';

import styles from './PasswordRecovery.module.css';
import { PasswordRecoveryData, passwordRecoverySchema } from './PasswordRecoverySchema';

type PasswordRecoveryConentProps = {
    forgotPassword: ReturnType<typeof useForgotPasswordMutation>[0];
    isError: boolean;
    isOpen: boolean;
    onClose: () => void;
    onOpenNextModule: () => void;
};

const PasswordRecoveryContent = ({
    forgotPassword,
    isError,
    isOpen,
    onClose,
    onOpenNextModule,
}: PasswordRecoveryConentProps) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<PasswordRecoveryData>({
        resolver: yupResolver(passwordRecoverySchema),
        mode: 'onBlur',
    });
    const [title, setTitle] = useState('');
    const [notification, setNotification] = useState('');
    const [isVerificationFailedOpen, setIsVerificationFailedOpen] = useState(isError);
    const message =
        'Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код';
    const handleError = useHandleError(setTitle, setNotification, 'password-recovery');

    const FIELD_EMAIL = 'email';

    useEffect(() => {
        if (!isOpen) {
            reset({ email: '' });
        }
    }, [isOpen, reset]);

    const onSubmit = async (data: PasswordRecoveryData) => {
        try {
            await forgotPassword(data).unwrap();
            onClose();
            onOpenNextModule();
            dispatch(setSaveEmail(data.email));
        } catch (err) {
            setIsVerificationFailedOpen(true);
            reset({ email: '' });
            handleError(err);
        }
    };

    const emailRegister = register(FIELD_EMAIL);

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
                        color='alpha.900'
                    >
                        {message}
                    </Text>
                    <VStack
                        as='form'
                        spacing={0}
                        w='full'
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        <CommonInputField
                            id={FIELD_EMAIL}
                            label={AUTH_FORM.EMAIL_LABEL}
                            type='email'
                            placeholder={AUTH_FORM.EMAIL_PLACEHOLDER}
                            autoComplete='email'
                            register={register(FIELD_EMAIL)}
                            error={errors.email?.message}
                            handleBlur={(e) =>
                                handleBlurTrim(e, FIELD_EMAIL, setValue, emailRegister.onBlur)
                            }
                            dataTestId={DATA_TEST_ID.EMAIL_INPUT}
                            borderColor={
                                errors.email || isVerificationFailedOpen ? 'red' : 'lime.150'
                            }
                        />

                        <Button
                            className={styles.button}
                            maxW='100%'
                            width='100%'
                            px={0}
                            mt={1}
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
        </Modal>
    );
};

export const PasswordRecoveryWithLoader = withLoader(PasswordRecoveryContent);
