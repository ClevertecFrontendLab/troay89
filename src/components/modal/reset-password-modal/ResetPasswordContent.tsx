import {
    Button,
    Heading,
    Icon,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { LoginPasswordEnum } from '~/app/pages/registration-login-password-page/loginPasswordEnum';
import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import { CommonInputField } from '~/components/common-input-field/CommonInputField';
import { CloseRoundModule } from '~/components/icons/CloseRoundModule';
import CrossedEye from '~/components/icons/CrossedEye';
import Eye from '~/components/icons/Eye';
import { withLoader } from '~/components/with-loader/WithLoader';
import { AUTH_FORM } from '~/constants/authForm';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { useHandleError } from '~/hooks/useErrorHandler';
import { getSaveEmail } from '~/store/selectors/saveEmailSliceSelector';
import { useResetPasswordMutation } from '~/store/slice/api/api-slice';
import { handleBlurTrim } from '~/utils/TrimOnBlur';

import styles from './ResetPasswordModal.module.css';
import { ResetPasswordData, ResetPasswordScheme } from './ResetPasswordScheme';

type ResetPasswordConstentType = {
    resetPassword: ReturnType<typeof useResetPasswordMutation>[0];
    isError: boolean;
    isOpen: boolean;
    onClose: () => void;
    onOpenNextModule: () => void;
};

const ResetPasswordContent = ({
    resetPassword,
    isError,
    isOpen,
    onClose,
    onOpenNextModule,
}: ResetPasswordConstentType) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ResetPasswordData>({
        resolver: yupResolver(ResetPasswordScheme),
        mode: 'onBlur',
    });
    const [isResetPasswordFailedOpen, setIsResetPasswordFailedOpen] = useState(isError);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    const [title, setTitle] = useState('');
    const [notification, setNotification] = useState('');
    const handleError = useHandleError(setTitle, setNotification, 'reset-password');

    const email = useSelector(getSaveEmail);

    const onSubmit = async (data: ResetPasswordData) => {
        try {
            await resetPassword({ email, ...data }).unwrap();
            onOpenNextModule();
            onClose();
        } catch (err) {
            setIsResetPasswordFailedOpen(true);
            handleError(err);
        }
    };

    const loginRegister = register(LoginPasswordEnum.LOGIN);

    const heading = 'Восстановление \nаккаунта';
    return (
        <Modal
            isCentered
            isOpen={isOpen}
            onClose={onClose}
            data-test-id={DATA_TEST_ID.RESET_CREDENTIALS_MODAL}
        >
            <ModalOverlay backgroundColor='alpha.300' backdropFilter='blur(4px)' />
            <ModalContent
                maxW={{ base: '316px', bp115: '396px' }}
                alignItems='center'
                m={0}
                p={8}
                borderRadius='16px'
                data-test-id={DATA_TEST_ID.RESET_CREDENTIALS_MODAL}
            >
                <Icon
                    as={CloseRoundModule}
                    position='absolute'
                    top={6}
                    right={6}
                    boxSize={6}
                    onClick={onClose}
                    data-test-id={DATA_TEST_ID.CLOSE_BUTTON}
                />
                <Heading
                    className={styles.title}
                    textAlign='center'
                    m={0}
                    as='h1'
                    whiteSpace='pre-line'
                >
                    {heading}
                </Heading>
                <ModalBody pt={6} pb={0} w='100%' px={0}>
                    <VStack
                        as='form'
                        noValidate
                        spacing={1}
                        w='full'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <CommonInputField
                            id={LoginPasswordEnum.LOGIN}
                            label={AUTH_FORM.LOGIN_LABEL}
                            type='text'
                            placeholder={AUTH_FORM.LOGIN_PLACEHOLDER_SHORT}
                            autoComplete='username'
                            register={register(LoginPasswordEnum.LOGIN)}
                            error={errors.login?.message}
                            handleBlur={(e) =>
                                handleBlurTrim(
                                    e,
                                    LoginPasswordEnum.LOGIN,
                                    setValue,
                                    loginRegister.onBlur,
                                )
                            }
                            dataTestId={DATA_TEST_ID.LOGIN_INPUT}
                            borderColor={errors.login ? 'red' : 'lime.150'}
                            prompt={
                                <Text className={styles.message} mt={1}>
                                    {AUTH_FORM.LOGIN_PROMPT}
                                </Text>
                            }
                        />

                        <CommonInputField
                            id={LoginPasswordEnum.PASSWORD}
                            label={AUTH_FORM.PASSWORD_LABEL}
                            type={isShowPassword ? 'text' : 'password'}
                            placeholder={AUTH_FORM.PASSWORD_PLACEHOLDER_SHORT}
                            autoComplete='new-password'
                            register={register(LoginPasswordEnum.PASSWORD)}
                            error={errors.password?.message}
                            dataTestId={DATA_TEST_ID.PASSWORD_INPUT}
                            borderColor={errors.password ? 'red' : 'lime.150'}
                            inputRightElement={
                                <Icon
                                    boxSize='18px'
                                    as={isShowPassword ? Eye : CrossedEye}
                                    onPointerDown={() => setIsShowPassword(true)}
                                    onPointerUp={() => setIsShowPassword(false)}
                                    onPointerLeave={() => setIsShowPassword(false)}
                                    data-test-id={DATA_TEST_ID.PASSWORD_VISIBILITY_BUTTON}
                                />
                            }
                            prompt={
                                <Text className={styles.message} mt={1}>
                                    {AUTH_FORM.PASSWORD_PROMPT}
                                </Text>
                            }
                        />

                        <CommonInputField
                            id={LoginPasswordEnum.CONFIRM_PASSWORD}
                            label={AUTH_FORM.CONFIRM_PASSWORD_LABEL}
                            type={isShowConfirmPassword ? 'text' : 'password'}
                            placeholder={AUTH_FORM.PASSWORD_PLACEHOLDER_SHORT}
                            autoComplete='new-password'
                            register={register(LoginPasswordEnum.CONFIRM_PASSWORD)}
                            error={errors.passwordConfirm?.message}
                            dataTestId={DATA_TEST_ID.CONFIRM_PASSWORD_INPUT}
                            borderColor={errors.passwordConfirm ? 'red' : 'lime.150'}
                            inputRightElement={
                                <Icon
                                    boxSize='18px'
                                    as={isShowConfirmPassword ? Eye : CrossedEye}
                                    onPointerDown={() => setIsShowConfirmPassword(true)}
                                    onPointerUp={() => setIsShowConfirmPassword(false)}
                                    onPointerLeave={() => setIsShowConfirmPassword(false)}
                                />
                            }
                        />
                        <Button
                            className={styles.button}
                            bg='alpha.900'
                            type='submit'
                            width='full'
                            color='white'
                            size='lg'
                            mt={2}
                            colorScheme='teal'
                            data-test-id={DATA_TEST_ID.SUBMIT_BUTTON}
                        >
                            Зарегистрироваться
                        </Button>
                    </VStack>
                </ModalBody>
                {isResetPasswordFailedOpen && (
                    <ErrorModal
                        onClose={() => setIsResetPasswordFailedOpen(false)}
                        title={title}
                        notification={notification}
                    />
                )}
            </ModalContent>
        </Modal>
    );
};

export const ResetPasswordWithLoader = withLoader(ResetPasswordContent);
