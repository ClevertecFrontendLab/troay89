import { Button, Flex, Icon, Link, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Location, useLocation, useNavigate } from 'react-router';

import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import { AlertSuccess } from '~/components/alert/alert-success/AlertSuccess';
import { CommonInputField } from '~/components/common-input-field/CommonInputField';
import CrossedEye from '~/components/icons/CrossedEye';
import Eye from '~/components/icons/Eye';
import { LoginFailedModule } from '~/components/modal/login-failed-modal/LoginFailedModal';
import { PasswordRecoveryModal } from '~/components/modal/password-recovery/PasswordRecoveryModal';
import { PinInputModal } from '~/components/modal/pinInput-modal/PinInputModal';
import { ResetPasswordModal } from '~/components/modal/reset-password-modal/ResetPasswordModal';
import { withLoader } from '~/components/with-loader/WithLoader';
import { AUTH_FORM } from '~/constants/authForm';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { SUCCESS_MESSAGE } from '~/constants/successMessage';
import { useHandleError } from '~/hooks/useErrorHandler';
import { useLoginMutation } from '~/store/slice/api/api-slice';
import { VerificationState } from '~/type/verificationState';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';
import { handleBlurTrim } from '~/utils/TrimOnBlur';

import { LoginFields } from './loginFieldsEnum';
import styles from './LoginPage.module.css';
import { LoginData, loginSchema } from './loginSchema';

type LoginContentProps = {
    loginUser: ReturnType<typeof useLoginMutation>[0];
    isError: boolean;
};

const LoginContent = ({ loginUser, isError }: LoginContentProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: yupResolver(loginSchema),
        mode: 'onChange',
    });

    const location = useLocation() as Location<VerificationState>;
    const emailVerified = location.state?.emailVerified;
    const navigate = useNavigate();

    const [lastLoginData, setLastLoginData] = useState<LoginData | null>(null);
    const [title, setTitle] = useState('');
    const [notification, setNotification] = useState('');
    const [isVerificationSuccess, setIsVerificationSuccess] = useState(emailVerified === 'true');
    const [isOpenError, setIsOpenError] = useState(isError);
    const [isShowModalLoginFailed, setIsShowModalLoginFailed] = useState(false);
    const [isShowModalRecovery, setIsShowModalRecovery] = useState(false);
    const [isShowPinInputModal, setIsShowPinInputModal] = useState(false);
    const [isShowResetPasswordModal, setIsShowResetPasswordModal] = useState(false);
    const [isShowAlertSuccessModal, setIsShowAlertSuccessModal] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleError = useHandleError(setTitle, setNotification, 'login');

    const performLogin = async (data: LoginData) => {
        try {
            await loginUser(data).unwrap();
            setIsShowModalLoginFailed(false);
            navigate('/', { replace: true });
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                if (typeof error.status === 'number' && error.status >= 500) {
                    setIsOpenError(false);
                    setIsShowModalLoginFailed(true);
                } else {
                    setIsOpenError(true);
                    handleError(error);
                }
            }
        }
    };

    const loginRegister = register(LoginFields.LOGIN);

    const handleRetry = async () => {
        if (!lastLoginData) return;
        performLogin(lastLoginData);
    };

    const onSubmit = async (data: LoginData) => {
        setLastLoginData(data);
        performLogin(data);
    };

    return (
        <Flex align='center' justify='center' w='100%' flexDir='column' position='static'>
            <VStack
                as='form'
                spacing={1}
                w='full'
                onSubmit={handleSubmit(onSubmit)}
                data-test-id={DATA_TEST_ID.SING_IN_FORM}
            >
                <CommonInputField
                    id={LoginFields.LOGIN}
                    label={AUTH_FORM.LOGIN_LABEL}
                    type='text'
                    placeholder={AUTH_FORM.LOGIN_PLACEHOLDER}
                    autoComplete='username'
                    register={register(LoginFields.LOGIN)}
                    error={errors.login?.message}
                    handleBlur={(e) =>
                        handleBlurTrim(e, LoginFields.LOGIN, setValue, loginRegister.onBlur)
                    }
                    dataTestId={DATA_TEST_ID.LOGIN_INPUT}
                    borderColor={errors.login || isOpenError ? 'red' : 'lime.150'}
                />

                <CommonInputField
                    id={LoginFields.PASSWORD}
                    label={AUTH_FORM.PASSWORD_LABEL}
                    type={isShowPassword ? 'text' : 'password'}
                    placeholder={AUTH_FORM.PASSWORD_PLACEHOLDER}
                    autoComplete='password'
                    register={register(LoginFields.PASSWORD)}
                    error={errors.password?.message}
                    dataTestId={DATA_TEST_ID.PASSWORD_INPUT}
                    borderColor={errors.password || isOpenError ? 'red' : 'lime.150'}
                    inputRightElement={
                        <Icon
                            boxSize='18px'
                            as={isShowPassword ? Eye : CrossedEye}
                            onMouseDown={() => setIsShowPassword(true)}
                            onMouseUp={() => setIsShowPassword(false)}
                            onMouseLeave={() => setIsShowPassword(false)}
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
                    mt='88px'
                    mb={4}
                    colorScheme='teal'
                    data-test-id={DATA_TEST_ID.SUBMIT_BUTTON}
                >
                    Войти
                </Button>
            </VStack>
            <Link
                className={styles.link}
                onClick={() => setIsShowModalRecovery(true)}
                data-test-id={DATA_TEST_ID.FORGOT_PASSWORD}
            >
                {AUTH_FORM.FORGOT_LOGIN_PASSWORD}
            </Link>
            {isOpenError && !isShowModalLoginFailed && (
                <ErrorModal
                    onClose={() => setIsOpenError(false)}
                    title={title}
                    notification={notification}
                    position='absolute'
                    ml='unset'
                    ml_bp95='unset'
                    left='unset'
                />
            )}
            <LoginFailedModule
                onRetry={handleRetry}
                onClose={() => setIsShowModalLoginFailed(false)}
                isOpen={isShowModalLoginFailed}
            />
            {isVerificationSuccess && (
                <AlertSuccess
                    onClose={() => setIsVerificationSuccess(false)}
                    message={SUCCESS_MESSAGE.SUCCESS_VERIFICATY}
                />
            )}
            <PasswordRecoveryModal
                isOpen={isShowModalRecovery}
                onOpenNextModule={() => setIsShowPinInputModal(true)}
                onClose={() => setIsShowModalRecovery(false)}
            />
            <PinInputModal
                isOpen={isShowPinInputModal}
                onClose={() => setIsShowPinInputModal(false)}
                onOpenNextModule={() => setIsShowResetPasswordModal(true)}
            />
            <ResetPasswordModal
                isOpen={isShowResetPasswordModal}
                onClose={() => setIsShowResetPasswordModal(false)}
                onOpenNextModule={() => setIsShowAlertSuccessModal(true)}
            />
            {isShowAlertSuccessModal && (
                <AlertSuccess
                    onClose={() => setIsShowAlertSuccessModal(false)}
                    message={SUCCESS_MESSAGE.SUCCESS_RECOVERY}
                />
            )}
        </Flex>
    );
};

export const LoginContentWithLoader = withLoader(LoginContent);
