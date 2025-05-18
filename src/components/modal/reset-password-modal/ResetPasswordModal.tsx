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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import { CloseRoundModule } from '~/components/icons/CloseRoundModule';
import CrossedEye from '~/components/icons/CrossedEye';
import Eye from '~/components/icons/Eye';
import { Overlay } from '~/components/overlay/Overlay';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { getSaveEmail } from '~/store/selectors/saveEmailSliceSelector';
import { useResetPasswordMutation } from '~/store/slice/app-slice';
import { handleBlurTrim } from '~/utils/TrimOnBlur';

import styles from './ResetPasswordModal.module.css';
import { ResetPasswordData, ResetPasswordScheme } from './ResetPasswordScheme';

type ResetPasswordType = {
    isOpen: boolean;
    onClose: () => void;
    isOpenNextModule: () => void;
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

    const email = useSelector(getSaveEmail);

    const onSubmit = async (data: ResetPasswordData) => {
        try {
            await resetPassword({ email, ...data }).unwrap();
            isOpenNextModule();
            onClose();
        } catch (err) {
            console.log(err);
            setIsResetPasswordFailedOpen(true);
            setTitle('Ошибка сервера');
            setNotification('Попробуйте немного позже');
        }
    };

    const loginRegister = register('login');

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
                                onBlur={(e) =>
                                    handleBlurTrim(e, 'login', setValue, loginRegister.onBlur)
                                }
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
                                    {...register('password')}
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
            {isLoading && <Overlay />}
        </Modal>
    );
};
