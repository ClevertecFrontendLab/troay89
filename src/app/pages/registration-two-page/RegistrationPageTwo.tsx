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
    Progress,
    Text,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import CrossedEye from '~/components/icons/CrossedEye';
import Eye from '~/components/icons/Eye';
import { RegistrationModal } from '~/components/modal/registration-modal/RegistrationModal';
import { Overlay } from '~/components/overlay/Overlay';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { ERROR_MESSAGE } from '~/constants/errorMessage';
import { firstPartDataCreateUserSelector } from '~/store/selectors/firstPartDataCreateUserSelector';
import { useRegistrationMutation } from '~/store/slice/api/api-slice';
import { handleBlurTrim } from '~/utils/TrimOnBlur';

import styles from './RegistrationPageTwo.module.css';
import { RegistrationTwoData, registrationTwoSchema } from './registrationTwoSchema';

export const RegistrationTwoPage = () => {
    const [registrationUser, { isLoading, isError }] = useRegistrationMutation();
    const [isOpenError, setIsOpenError] = useState(isError);

    useEffect(() => {
        setIsOpenError(isError);
    }, [isError]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<RegistrationTwoData>({
        resolver: yupResolver(registrationTwoSchema),
        mode: 'onChange',
    });

    const [title, setTitle] = useState('');
    const [notification, setNotification] = useState('');
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    const firstPartDataUserRegistration = useSelector(firstPartDataCreateUserSelector);

    const loginValue = watch('login');
    const passwordValue = watch('password');
    const confirmPasswordValue = watch('confirmPassword');

    const loginRegister = register('login');

    const onSubmit = async (dataFromStep2: RegistrationTwoData) => {
        const { firstName, lastName, email } = firstPartDataUserRegistration;
        if (firstName && lastName && email) {
            const registrationData = {
                firstName,
                lastName,
                email,
                login: dataFromStep2.login,
                password: dataFromStep2.password,
            };
            try {
                await registrationUser(registrationData).unwrap();
                setIsShowModal(true);
            } catch (err) {
                if (err && typeof err === 'object' && 'status' in err) {
                    const error = err as FetchBaseQueryError;
                    if (
                        error.status === 400 &&
                        error.data &&
                        typeof error.data === 'object' &&
                        'message' in error.data
                    ) {
                        const message = (error.data as { message: string }).message;
                        if (message.toLowerCase().includes('email')) {
                            setTitle(ERROR_MESSAGE.EMAIL_EXITS);
                            setNotification('');
                        } else if (
                            message.toLowerCase().includes('login') ||
                            message.toLowerCase().includes('username')
                        ) {
                            setTitle(ERROR_MESSAGE.LOGIN_EXITS);
                            setNotification('');
                        }
                    }
                    if (typeof error.status === 'number' && error.status >= 500) {
                        setTitle(ERROR_MESSAGE.ERROR_SERVER);
                        setNotification(ERROR_MESSAGE.ERROR_SERVER_NOTIFICATION);
                    }
                }
            }
        }
    };

    const validInputsCount =
        (loginValue && !errors.login ? 1 : 0) +
        (passwordValue && !errors.password ? 1 : 0) +
        (confirmPasswordValue && !errors.confirmPassword ? 1 : 0);

    const usernameReg = register('login');
    const passwordReg = register('password');
    const confirmPasswordReg = register('confirmPassword');

    const progressValue = ((3 + validInputsCount) / 6) * 100;

    if (isLoading) {
        return <Overlay />;
    }

    return (
        <Flex align='center' justify='center' w='100%'>
            <VStack
                as='form'
                noValidate
                spacing={1}
                w='full'
                onSubmit={handleSubmit(onSubmit)}
                data-test-id={DATA_TEST_ID.SIGN_UP_FORM}
            >
                <VStack w='100%' alignItems='flex-start' gap={0} mb={5}>
                    <Text className={styles.form_control}>Шаг 2. Логин и пароль</Text>
                    <Progress
                        bg='alpha.100'
                        size='sm'
                        value={progressValue}
                        w='100%'
                        colorScheme='lime'
                        data-test-id={DATA_TEST_ID.SING_UP_PROGRESS}
                    />
                </VStack>
                <FormControl id='login'>
                    <FormLabel className={styles.form_control} mb={1}>
                        Логин для входа на сайт
                    </FormLabel>
                    <Input
                        className={styles.form_input}
                        type='text'
                        placeholder='Логин'
                        bg='white'
                        size='lg'
                        borderColor={errors.login ? 'red' : 'lime.150'}
                        _focus={{ boxShadow: 'none' }}
                        {...usernameReg}
                        onBlur={(e) => handleBlurTrim(e, 'login', setValue, loginRegister.onBlur)}
                        data-test-id={DATA_TEST_ID.LOGIN_INPUT}
                    />
                    <Text className={styles.message} mt={1}>
                        Логин не менее 5 символов, только латиница
                    </Text>
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
                    <InputGroup>
                        <Input
                            className={styles.form_input}
                            type={isShowPassword ? 'text' : 'password'}
                            placeholder='Пароль'
                            bg='white'
                            size='lg'
                            borderColor={errors.password ? 'red' : 'lime.150'}
                            _focus={{ boxShadow: 'none' }}
                            {...passwordReg}
                            data-test-id={DATA_TEST_ID.PASSWORD_INPUT}
                        />
                        <InputRightElement boxSize={12}>
                            <Icon
                                boxSize='18px'
                                as={isShowPassword ? CrossedEye : Eye}
                                onPointerDown={() => setIsShowPassword(true)}
                                onPointerUp={() => setIsShowPassword(false)}
                                onPointerLeave={() => setIsShowPassword(false)}
                            />
                        </InputRightElement>
                    </InputGroup>
                    <Text className={styles.message} mt={1}>
                        Пароль не менее 8 символов, с заглавной буквой и цифрой
                    </Text>
                    {errors.password ? (
                        <Text className={styles.message} color='red.500' mt={1}>
                            {errors.password.message}
                        </Text>
                    ) : (
                        <Box h={5}></Box>
                    )}
                </FormControl>

                <FormControl id='confirmPassword'>
                    <FormLabel className={styles.form_control} mb={1}>
                        Повторите пароль
                    </FormLabel>
                    <InputGroup>
                        <Input
                            className={styles.form_input}
                            type={isShowConfirmPassword ? 'text' : 'password'}
                            placeholder='Повторите пароль'
                            bg='white'
                            size='lg'
                            borderColor={errors.confirmPassword ? 'red' : 'lime.150'}
                            _focus={{ boxShadow: 'none' }}
                            {...confirmPasswordReg}
                            data-test-id={DATA_TEST_ID.CONFIRM_PASSWORD_INPUT}
                        />
                        <InputRightElement boxSize={12}>
                            <Icon
                                boxSize='18px'
                                as={isShowConfirmPassword ? CrossedEye : Eye}
                                onPointerDown={() => setIsShowConfirmPassword(true)}
                                onPointerUp={() => setIsShowConfirmPassword(false)}
                                onPointerLeave={() => setIsShowConfirmPassword(false)}
                            />
                        </InputRightElement>
                    </InputGroup>
                    {errors.confirmPassword ? (
                        <Text className={styles.message} color='red.500' mt={1}>
                            {errors.confirmPassword.message}
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
                    mt={6}
                    colorScheme='teal'
                    data-test-id={DATA_TEST_ID.SUBMIT_BUTTON}
                >
                    Зарегистрироваться
                </Button>
            </VStack>
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
            {firstPartDataUserRegistration.email && (
                <RegistrationModal
                    email={firstPartDataUserRegistration.email}
                    onClose={() => setIsShowModal(false)}
                    isShow={isShowModal}
                />
            )}
        </Flex>
    );
};
