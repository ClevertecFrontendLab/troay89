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
import * as yup from 'yup';

import { ErrorModal } from '~/components/error-modal/ErrorModal';
import CrossedEye from '~/components/icons/CrossedEye';
import Eye from '~/components/icons/Eye';
import { RegistrationModal } from '~/components/modal/registration-modal/RegistrationModal';
import { Overlay } from '~/components/overlay/Overlay';
import { useBlurValidatedFields } from '~/hooks/useBlurValidatedFields';
import { firstPartDataCreateUserSelector } from '~/store/selectors/firstPartDataCreateUserSelector';
import { useRegistrationMutation } from '~/store/slice/app-slice';

import styles from './RegistrationPageTwo.module.css';

const registrationTwoSchema = yup
    .object({
        username: yup
            .string()
            .required('Введите логин')
            .min(5, 'Не соответствует формату')
            .max(50, 'Максимальная длина 50 символов')
            .matches(/^[A-Za-z!@#$&_+\-.]+$/, 'Не соответствует формату'),
        password: yup
            .string()
            .required('Введите пароль')
            .min(8, 'Не соответствует формату')
            .max(50, 'Максимальная длина 50 символов')
            .matches(/^(?=.*\d)[A-Za-z\d!@#$&_+\-.]+$/, 'Не соответствует формату'),
        confirmPassword: yup
            .string()
            .required('Повторите пароль')
            .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
    })
    .required();

type RegistrationTwoData = {
    username: string;
    password: string;
    confirmPassword: string;
};

export const RegistrationTwoPage = () => {
    const [registrationUser, { isLoading, isError }] = useRegistrationMutation();
    const [isOpenError, setIsOpenError] = useState(isError);

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

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<RegistrationTwoData>({
        resolver: yupResolver(registrationTwoSchema),
        mode: 'onBlur',
    });

    const [title, setTitle] = useState('');
    const [notification, setNotification] = useState('');
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    const firstPartDataUserRegistration = useSelector(firstPartDataCreateUserSelector);

    const { validatedFields, handleBlur } = useBlurValidatedFields<RegistrationTwoData>(trigger);

    const onSubmit = async (dataFromStep2: RegistrationTwoData) => {
        if (
            firstPartDataUserRegistration.firstName &&
            firstPartDataUserRegistration.lastName &&
            firstPartDataUserRegistration.email
        ) {
            const registrationData = {
                firstName: firstPartDataUserRegistration.firstName,
                lastName: firstPartDataUserRegistration.lastName,
                email: firstPartDataUserRegistration.email,
                login: dataFromStep2.username,
                password: dataFromStep2.password,
            };

            try {
                const response = await registrationUser(registrationData).unwrap();
                setIsShowModal(true);
                console.log('Registration success:', response);
            } catch (err) {
                console.log(err, 'err');
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
                            setTitle('Пользователь с таким email уже существует.');
                            setNotification('');
                        } else if (
                            message.toLowerCase().includes('login') ||
                            message.toLowerCase().includes('username')
                        ) {
                            setTitle('Пользователь с таким логином уже существует.');
                            setNotification('');
                        }
                    }
                    if (typeof error.status === 'number' && error.status >= 500) {
                        setTitle('Ошибка сервера');
                        setNotification('Попробуйте немного позже');
                    }
                }
            }
        }
    };

    const validInputsCount =
        (validatedFields.username ? 1 : 0) +
        (validatedFields.password ? 1 : 0) +
        (validatedFields.confirmPassword ? 1 : 0);

    const usernameReg = register('username');
    const passwordReg = register('password');
    const confirmPasswordReg = register('confirmPassword');

    const progressValue = ((3 + validInputsCount) / 6) * 100;

    if (isLoading) {
        return <Overlay />;
    }

    return (
        <Flex align='center' justify='center' w='100%'>
            <VStack as='form' noValidate spacing={1} w='full' onSubmit={handleSubmit(onSubmit)}>
                <VStack w='100%' alignItems='flex-start' gap={0} mb={5}>
                    <Text className={styles.form_control}>Шаг 2. Логин и пароль</Text>
                    <Progress
                        bg='alpha.100'
                        size='sm'
                        value={progressValue}
                        w='100%'
                        colorScheme='lime'
                    />
                </VStack>
                <FormControl id='firstName'>
                    <FormLabel className={styles.form_control} mb={1}>
                        Логин для входа на сайт
                    </FormLabel>
                    <Input
                        className={styles.form_input}
                        type='text'
                        placeholder='Логин'
                        bg='white'
                        size='lg'
                        borderColor={errors.username ? 'red' : 'lime.150'}
                        _focus={{ boxShadow: 'none' }}
                        {...usernameReg}
                        onBlur={(e) => handleBlur('username', e, usernameReg.onBlur)}
                    />
                    <Text className={styles.message} mt={1}>
                        Логин не менее 5 символов, только латиница
                    </Text>
                    {errors.username ? (
                        <Text className={styles.message} color='red.500' mt={1}>
                            {errors.username.message}
                        </Text>
                    ) : (
                        <Box h={5}></Box>
                    )}
                </FormControl>

                <FormControl id='lastName'>
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
                            onBlur={(e) => handleBlur('password', e, passwordReg.onBlur)}
                        />
                        <InputRightElement>
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

                <FormControl id='email'>
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
                            onBlur={(e) =>
                                handleBlur('confirmPassword', e, confirmPasswordReg.onBlur)
                            }
                        />
                        <InputRightElement>
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
