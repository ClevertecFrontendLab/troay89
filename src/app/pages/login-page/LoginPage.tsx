import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Link,
    Text,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Location, useLocation, useNavigate } from 'react-router';
import * as yup from 'yup';

import { AlertSuccess } from '~/components/alert/alert-success/AlertSuccess';
import { ErrorModal } from '~/components/error-modal/ErrorModal';
import { LoginFailedModule } from '~/components/modal/login-failed-modal/LoginFailedModal';
import { PasswordRecovery } from '~/components/modal/password-recovery/PasswordRecovery';
import { PinInputModal } from '~/components/modal/pinInput-modal/PinInputModal';
import { ResetPasswordModal } from '~/components/modal/reset-password-modal/ResetPasswordModal';
import { Overlay } from '~/components/overlay/Overlay';
import { useLoginMutation } from '~/store/slice/app-slice';

import styles from './LoginPage.module.css';

type LoginData = {
    login: string;
    password: string;
};

type VerificationState = {
    emailVerified?: 'true' | 'false' | undefined;
};

const loginSchema = yup
    .object({
        login: yup.string().required('Введите логин').max(50, 'Максимальная длина 50 символов'),
        password: yup.string().required('Введите пароль').max(50, 'Максимальная длина 50 символов'),
    })
    .required();

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

    const navigate = useNavigate();
    const [loginUser, { isLoading, isError }] = useLoginMutation();
    const location = useLocation() as Location<VerificationState>;
    const emailVerified = location.state?.emailVerified;
    const [isVerificationFailedOpen, setIsVerificationFailedOpen] = useState(
        emailVerified === 'false',
    );

    const [isOpenError, setIsOpenError] = useState(isError);
    const [lastLoginData, setLastLoginData] = useState<LoginData | null>(null);
    const [title, setTitle] = useState('');
    const [notification, setNotification] = useState('');
    const [isShowModalLoginFailed, setIsShowModalLoginFailed] = useState(false);
    const [isShowModalRecovery, setIsShowModalRecovery] = useState(false);
    const [isShowPinInputModal, setIsShowPinInputModal] = useState(false);
    const [isShowResetPasswordModal, setIsShowResetPasswordModal] = useState(false);

    useEffect(() => {
        setIsOpenError(isError);
    }, [isError]);

    useEffect(() => {
        if (isOpenError) {
            const timer = setTimeout(() => {
                setIsOpenError(false);
            }, 15000);
            return () => clearTimeout(timer);
        }
    }, [isOpenError]);

    const performLogin = async (data: LoginData) => {
        try {
            const response = await loginUser(data).unwrap();
            if (response.accessToken) {
                localStorage.setItem('accessToken', response.accessToken);
                navigate('/', { replace: true });
            }
            setIsShowModalLoginFailed(false);
        } catch (err) {
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as FetchBaseQueryError;
                if (error.status === 401) {
                    setTitle('Неверный логин или пароль');
                    setNotification('Попробуйте снова');
                } else if (error.status === 403) {
                    setTitle('E-mail не верифицирован');
                    setNotification('Проверьте почту и перейдите по ссылке');
                } else if (typeof error.status === 'number' && error.status >= 500) {
                    setIsShowModalLoginFailed(true);
                }
            }
        }
    };

    const loginRegister = register('login');

    const handleTrimBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        loginRegister.onBlur(e);
        const trimmedValue = e.target.value.trim();
        if (e.target.value !== trimmedValue) {
            setValue('login', trimmedValue);
        }
    };

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
        <Flex
            align='center'
            justify='center'
            w='100%'
            flexDir='column'
            onSubmit={handleSubmit(onSubmit)}
            position='static'
        >
            <VStack as='form' spacing={1} w='full'>
                <FormControl id='login'>
                    <FormLabel className={styles.form_control} mb={1}>
                        Логин для входа на сайт
                    </FormLabel>
                    <Input
                        className={styles.form_input}
                        type='text'
                        placeholder='Введите логин'
                        bg='white'
                        size='lg'
                        _focus={{ boxShadow: 'none' }}
                        borderColor={errors.login || isOpenError ? 'red' : 'lime.150'}
                        {...register('login')}
                        onBlur={handleTrimBlur}
                    />
                    {errors.login ? (
                        <Text className={styles.message} color='red.500' mt={1}>
                            {errors.login.message}
                        </Text>
                    ) : (
                        <Box h={5}></Box>
                    )}
                </FormControl>

                <FormControl id='password'>
                    <FormLabel className={styles.form_control} mb={1}>
                        Пароль
                    </FormLabel>
                    <Input
                        className={styles.form_input}
                        type='password'
                        placeholder='Пароль для сайта'
                        bg='white'
                        size='lg'
                        borderColor={errors.password || isOpenError ? 'red' : 'lime.150'}
                        _focus={{ boxShadow: 'none' }}
                        {...register('password')}
                    />
                    {errors.password ? (
                        <Text className={styles.message} color='red.500' mt={1}>
                            {errors.password.message}
                        </Text>
                    ) : (
                        <Box h={5}></Box>
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
                >
                    Войти
                </Button>
            </VStack>
            <Link className={styles.link} onClick={() => setIsShowModalRecovery(true)}>
                Забыли логин или пароль?
            </Link>
            {isOpenError && (
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
            {isVerificationFailedOpen && (
                <AlertSuccess onClose={() => setIsVerificationFailedOpen(false)} />
            )}
            <PasswordRecovery
                isOpen={isShowModalRecovery}
                onClose={() => setIsShowModalRecovery(false)}
            />
            <PinInputModal
                isOpen={isShowPinInputModal}
                onClose={() => setIsShowPinInputModal(false)}
            />
            <ResetPasswordModal
                isOpen={!isShowResetPasswordModal}
                onClose={() => setIsShowResetPasswordModal(false)}
            />
        </Flex>
    );
};
