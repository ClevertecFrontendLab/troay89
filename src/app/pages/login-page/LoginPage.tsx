import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Text,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Location, useLocation, useNavigate } from 'react-router';

import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import { AlertSuccess } from '~/components/alert/alert-success/AlertSuccess';
import CrossedEye from '~/components/icons/CrossedEye';
import Eye from '~/components/icons/Eye';
import { LoginFailedModule } from '~/components/modal/login-failed-modal/LoginFailedModal';
import { PasswordRecovery } from '~/components/modal/password-recovery/PasswordRecovery';
import { PinInputModal } from '~/components/modal/pinInput-modal/PinInputModal';
import { ResetPasswordModal } from '~/components/modal/reset-password-modal/ResetPasswordModal';
import { Overlay } from '~/components/overlay/Overlay';
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

export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: yupResolver(loginSchema),
        mode: 'onBlur',
    });

    const [loginUser, { isLoading, isError }] = useLoginMutation();
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

    if (isLoading) {
        return <Overlay />;
    }

    return (
        <Flex align='center' justify='center' w='100%' flexDir='column' position='static'>
            <VStack
                as='form'
                spacing={1}
                w='full'
                onSubmit={handleSubmit(onSubmit)}
                data-test-id={DATA_TEST_ID.SING_IN_FORM}
            >
                <FormControl id={LoginFields.LOGIN}>
                    <FormLabel className={styles.form_control} mb={1}>
                        {AUTH_FORM.LOGIN_LABEL}
                    </FormLabel>
                    <Input
                        className={styles.form_input}
                        type='text'
                        placeholder={AUTH_FORM.PASSWORD_PLACEHOLDER}
                        bg='white'
                        size='lg'
                        _focus={{ boxShadow: 'none' }}
                        borderColor={errors.login || isOpenError ? 'red' : 'lime.150'}
                        {...register(LoginFields.LOGIN)}
                        onBlur={(e) =>
                            handleBlurTrim(e, LoginFields.LOGIN, setValue, loginRegister.onBlur)
                        }
                        data-test-id={DATA_TEST_ID.LOGIN_INPUT}
                    />
                    {errors.login ? (
                        <Text className={styles.message} color='red.500' mt={1}>
                            {errors.login.message}
                        </Text>
                    ) : (
                        <Box h={5} />
                    )}
                </FormControl>

                <FormControl id={LoginFields.PASSWORD}>
                    <FormLabel className={styles.form_control} mb={1}>
                        {AUTH_FORM.PASSWORD_LABEL}
                    </FormLabel>
                    <InputGroup>
                        <Input
                            className={styles.form_input}
                            type={isShowPassword ? 'text' : 'password'}
                            placeholder={AUTH_FORM.PASSWORD_PLACEHOLDER}
                            bg='white'
                            size='lg'
                            borderColor={errors.password || isOpenError ? 'red' : 'lime.150'}
                            autoComplete={LoginFields.PASSWORD}
                            _focus={{ boxShadow: 'none' }}
                            {...register(LoginFields.PASSWORD)}
                            data-test-id={DATA_TEST_ID.PASSWORD_INPUT}
                        />
                        <InputRightElement
                            boxSize={12}
                            onMouseDown={() => setIsShowPassword(true)}
                            onMouseUp={() => setIsShowPassword(false)}
                            onMouseLeave={() => setIsShowPassword(false)}
                            data-test-id={DATA_TEST_ID.PASSWORD_VISIBILITY_BUTTON}
                        >
                            <Icon boxSize='18px' as={isShowPassword ? CrossedEye : Eye} />
                        </InputRightElement>
                    </InputGroup>
                    {errors.password ? (
                        <Text className={styles.message} color='red.500' mt={1}>
                            {errors.password.message}
                        </Text>
                    ) : (
                        <Box h={5} />
                    )}
                </FormControl>

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
            <PasswordRecovery
                isOpen={isShowModalRecovery}
                isOpenNextModule={() => setIsShowPinInputModal(true)}
                onClose={() => setIsShowModalRecovery(false)}
            />
            <PinInputModal
                isOpen={isShowPinInputModal}
                onClose={() => setIsShowPinInputModal(false)}
                isOpenNextModule={() => setIsShowResetPasswordModal(true)}
            />
            <ResetPasswordModal
                isOpen={isShowResetPasswordModal}
                onClose={() => setIsShowResetPasswordModal(false)}
                isOpenNextModule={() => setIsShowAlertSuccessModal(true)}
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
