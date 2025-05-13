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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { noExit } from '~/assets/images/modal-mage';
import { ErrorModal } from '~/components/error-modal/ErrorModal';
import { CloseRoundModule } from '~/components/icons/CloseRoundModule';
import { Overlay } from '~/components/overlay/Overlay';
import { useForgotPasswordMutation } from '~/store/slice/app-slice';

import styles from './PasswordRecovery.module.css';

type LoginFailedModuleType = {
    isOpen: boolean;
    onClose: () => void;
};

type PasswordRecoveryShema = {
    email: string;
};

const passwordRecovery = yup
    .object({
        email: yup
            .string()
            .required('Введите e-mail')
            .email('Введите корректный e-mail')
            .max(50, 'Максимальная длина 50 символов')
            .matches(/\.[A-Za-z]{2,}$/, 'Введите корректный e-mail'),
    })
    .required();

export const PasswordRecovery = ({ isOpen, onClose }: LoginFailedModuleType) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<PasswordRecoveryShema>({
        resolver: yupResolver(passwordRecovery),
        mode: 'onBlur',
    });
    const [forgotPassword, { isLoading, isError }] = useForgotPasswordMutation();
    const [title, setTitle] = useState('');
    const [notification, setNotification] = useState('');
    const [isVerificationFailedOpen, setIsVerificationFailedOpen] = useState(isError);
    const message =
        'Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код';
    const handleTrimBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        emailRegister.onBlur(e);
        const trimmedValue = e.target.value.trim();
        if (e.target.value !== trimmedValue) {
            setValue('email', trimmedValue);
        }
    };

    const onSubmit = async (data: PasswordRecoveryShema) => {
        try {
            const response = await forgotPassword(data).unwrap();
            onClose();
            setIsVerificationFailedOpen(false);
            console.log('Registration success:', response);
        } catch (err) {
            console.log('I am here');
            if (err && typeof err === 'object' && 'status' in err) {
                setIsVerificationFailedOpen(true);
                const error = err as FetchBaseQueryError;
                if (error.status === 403) {
                    setTitle('Такого e-mail нет.');
                    setNotification(
                        'Попробуйте другой e-mail или проверьте правильность его написания',
                    );
                }
                if (typeof error.status === 'number' && error.status >= 500) {
                    setTitle('Ошибка сервера');
                    setNotification('Попробуйте немного позже');
                }
            }
        }
    };

    const emailRegister = register('email');

    if (isLoading) {
        <Overlay />;
    }
    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay backgroundColor='alpha.300' backdropFilter='blur(4px)' />
                <ModalContent maxW='396px' alignItems='center' m={0}>
                    <Image src={noExit} boxSize='206px' mt={8} />
                    <Icon
                        as={CloseRoundModule}
                        position='absolute'
                        top={6}
                        right={6}
                        boxSize={6}
                        onClick={onClose}
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
                                    type='text'
                                    placeholder='e-mail'
                                    bg='white'
                                    size='lg'
                                    _focus={{ boxShadow: 'none' }}
                                    borderColor={errors.email ? 'red' : 'lime.150'}
                                    {...register('email')}
                                    onBlur={handleTrimBlur}
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
        </>
    );
};
