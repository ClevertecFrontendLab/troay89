import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { CloseRoundModule } from '~/components/icons/CloseRoundModule';

import styles from './ResetPasswordModal.module.css';

type ResetPasswordType = {
    isOpen: boolean;
    onClose: () => void;
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
        confirmPassword: yup
            .string()
            .required('Повторите пароль')
            .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
    })
    .required();

type ResetPasswordData = {
    login: string;
    password: string;
    confirmPassword: string;
};

export const ResetPasswordModal = ({ isOpen, onClose }: ResetPasswordType) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ResetPasswordData>({
        resolver: yupResolver(ResetPasswordScheme),
        mode: 'onBlur',
    });

    const onSubmit = async (data: ResetPasswordData) => {
        console.log(data, 'reset');
    };

    const loginRegister = register('login');

    const handleTrimBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        loginRegister.onBlur(e);
        const trimmedValue = e.target.value.trim();
        if (e.target.value !== trimmedValue) {
            setValue('login', trimmedValue);
        }
    };

    const title = 'Восстановление \nаккаунта';
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
                    {title}
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
                            <Input
                                className={styles.form_input}
                                type='password'
                                placeholder='Пароль'
                                bg='white'
                                size='lg'
                                borderColor={errors.password ? 'red' : 'lime.150'}
                                _focus={{ boxShadow: 'none' }}
                                {...register('password')}
                            />
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
                            <Input
                                className={styles.form_input}
                                type='password'
                                placeholder='Повторите пароль'
                                bg='white'
                                size='lg'
                                borderColor={errors.confirmPassword ? 'red' : 'lime.150'}
                                _focus={{ boxShadow: 'none' }}
                                {...register('confirmPassword')}
                            />
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
                            mt={2}
                            colorScheme='teal'
                        >
                            Зарегистрироваться
                        </Button>
                    </VStack>
                </ModalBody>
                {/* {isVerificationFailedOpen && <ErrorModal onClose={() => setIsVerificationFailedOpen(false)} title={title} notification={notification} />} */}
            </ModalContent>
        </Modal>
    );
};
