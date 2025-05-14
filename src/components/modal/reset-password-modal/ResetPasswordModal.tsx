import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ErrorModal } from '~/components/error-modal/ErrorModal';
import { CloseRoundModule } from '~/components/icons/CloseRoundModule';
import CrossedEye from '~/components/icons/CrossedEye';
import Eye from '~/components/icons/Eye';
import { Overlay } from '~/components/overlay/Overlay';
import { useResetPasswordMutation } from '~/store/slice/app-slice';

import styles from './ResetPasswordModal.module.css';

type ResetPasswordType = {
    isOpen: boolean;
    onClose: () => void;
    isOpenNextModule: () => void;
};

const ResetPasswordScheme = yup
    .object({
        login: yup
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
        passwordConfirm: yup
            .string()
            .required('Повторите пароль')
            .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
    })
    .required();

type ResetPasswordData = {
    login: string;
    password: string;
    passwordConfirm: string;
};

export const ResetPasswordModal = ({ isOpen, onClose, isOpenNextModule }: ResetPasswordType) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ResetPasswordData>({
        resolver: yupResolver(ResetPasswordScheme),
        mode: 'onBlur',
    });

    const [resetPassword, { isLoading, isError }] = useResetPasswordMutation();
    const [isResetPasswordFailedOpen, setIsResetPasswordFailedOpen] = useState(isError);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    const [title, setTitle] = useState('');
    const [notification, setNotification] = useState('');

    const onSubmit = async (data: ResetPasswordData) => {
        try {
            await resetPassword(data).unwrap();
            isOpenNextModule();
            onClose();
        } catch (err) {
            console.log(err);
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as FetchBaseQueryError;
                if (typeof error.status === 'number') {
                    setTitle('Ошибка сервера');
                    setNotification('Попробуйте немного позже');
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

    const heading = 'Восстановление \nаккаунта';
    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backgroundColor='alpha.300' backdropFilter='blur(4px)' />
            <ModalContent maxW='396px' alignItems='center' m={0} p={8}>
                <Icon
                    as={CloseRoundModule}
                    position='absolute'
                    top={6}
                    right={6}
                    boxSize={6}
                    onClick={onClose}
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
                                {...register('login')}
                                onBlur={handleTrimBlur}
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
                                    {...register('password')}
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

                        <FormControl id='passwordConfirm'>
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
                                    borderColor={errors.passwordConfirm ? 'red' : 'lime.150'}
                                    _focus={{ boxShadow: 'none' }}
                                    {...register('passwordConfirm')}
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
                            {errors.passwordConfirm ? (
                                <Text className={styles.message} color='red.500' mt={1}>
                                    {errors.passwordConfirm.message}
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
                            mt={2}
                            colorScheme='teal'
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
            {isLoading && <Overlay />}
        </Modal>
    );
};
