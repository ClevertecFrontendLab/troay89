import { Button, Flex, Icon, Progress, Text, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import { CommonInputField } from '~/components/common-input-field/CommonInputField';
import CrossedEye from '~/components/icons/CrossedEye';
import Eye from '~/components/icons/Eye';
import { RegistrationModal } from '~/components/modal/registration-modal/RegistrationModal';
import { withLoader } from '~/components/with-loader/WithLoader';
import { AUTH_FORM } from '~/constants/authForm';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { useHandleError } from '~/hooks/useErrorHandler';
import { firstPartDataCreateUserSelector } from '~/store/selectors/firstPartDataCreateUserSelector';
import { useRegistrationMutation } from '~/store/slice/api/api-slice';
import { handleBlurTrim } from '~/utils/TrimOnBlur';

import { LoginPasswordEnum } from './loginPasswordEnum';
import styles from './RegistrationLoginPassword.module.css';
import {
    registrationLoginPasswordData,
    registrationLoginPasswordSchema,
} from './RegistrationLoginPasswordSchema';

type RegistrationLoginPasswordContentProps = {
    registrationUser: ReturnType<typeof useRegistrationMutation>[0];
    isError: boolean;
};

const RegistrationLoginPasswordContent = ({
    registrationUser,
    isError,
}: RegistrationLoginPasswordContentProps) => {
    const [isOpenError, setIsOpenError] = useState(isError);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<registrationLoginPasswordData>({
        resolver: yupResolver(registrationLoginPasswordSchema),
        mode: 'onChange',
    });

    const [title, setTitle] = useState('');
    const [notification, setNotification] = useState('');
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    const firstPartDataUserRegistration = useSelector(firstPartDataCreateUserSelector);

    const loginValue = watch(LoginPasswordEnum.LOGIN);
    const passwordValue = watch(LoginPasswordEnum.PASSWORD);
    const confirmPasswordValue = watch(LoginPasswordEnum.CONFIRM_PASSWORD);
    const handleError = useHandleError(setTitle, setNotification, 'registration');

    const loginRegister = register(LoginPasswordEnum.LOGIN);

    const onSubmit = async (dataFromStep2: registrationLoginPasswordData) => {
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
                setIsOpenError(true);
                handleError(err);
            }
        }
    };

    const validInputsCount =
        (loginValue && !errors.login ? 1 : 0) +
        (passwordValue && !errors.password ? 1 : 0) +
        (confirmPasswordValue && !errors.passwordConfirm ? 1 : 0);

    const usernameReg = register(LoginPasswordEnum.LOGIN);
    const passwordReg = register(LoginPasswordEnum.PASSWORD);
    const confirmPasswordReg = register(LoginPasswordEnum.CONFIRM_PASSWORD);

    const progressValue = ((3 + validInputsCount) / 6) * 100;

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
                    <Text className={styles.form_control}>{AUTH_FORM.STEP_TWO}</Text>
                    <Progress
                        bg='alpha.100'
                        size='sm'
                        value={progressValue}
                        w='100%'
                        colorScheme='lime'
                        data-test-id={DATA_TEST_ID.SING_UP_PROGRESS}
                    />
                </VStack>
                <CommonInputField
                    id={LoginPasswordEnum.LOGIN}
                    label={AUTH_FORM.LOGIN_LABEL}
                    type='text'
                    placeholder={AUTH_FORM.LOGIN_PLACEHOLDER_SHORT}
                    autoComplete='username'
                    register={usernameReg}
                    error={errors.login?.message}
                    handleBlur={(e) =>
                        handleBlurTrim(e, LoginPasswordEnum.LOGIN, setValue, loginRegister.onBlur)
                    }
                    dataTestId={DATA_TEST_ID.LOGIN_INPUT}
                    borderColor={errors.login ? 'red' : 'lime.150'}
                    prompt={
                        <Text className={styles.message} mt={1} color='alpha.700'>
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
                    register={passwordReg}
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
                        <Text className={styles.message} mt={1} color='alpha.700'>
                            {AUTH_FORM.PASSWORD_PROMPT}
                        </Text>
                    }
                />

                <CommonInputField
                    id={LoginPasswordEnum.CONFIRM_PASSWORD}
                    label={AUTH_FORM.CONFIRM_PASSWORD_LABEL}
                    type={isShowConfirmPassword ? 'text' : 'password'}
                    placeholder={AUTH_FORM.CONFIRM_PASSWORD_PLACEHOLDER}
                    autoComplete='new-password'
                    register={confirmPasswordReg}
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

export const RegistrationLoginPasswordtWithLoader = withLoader(RegistrationLoginPasswordContent);
