import { Button, Flex, Progress, Text, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Location, useLocation, useNavigate } from 'react-router';

import { CommonInputField } from '~/components/common-input-field/CommonInputField';
import { VerificationFailedModal } from '~/components/modal/verification-failed-module/VerificationFailedModal';
import { AUTH_FORM } from '~/constants/authForm';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { setFirstPartDataCreateUser } from '~/store/slice/firstPartDataCreateUser';
import { VerificationState } from '~/type/verificationState';
import { handleBlurTrim } from '~/utils/TrimOnBlur';

import { RegistrationFieldsEnum } from './registrationFieldsEnum';
import styles from './RegistrationNameEmail.module.css';
import {
    registrationNameEmailData,
    registrationNameEmailSchema,
} from './registrationNameEmailSchema';

export const RegistrationNameEmailPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation() as Location<VerificationState>;
    const emailVerified = location.state?.emailVerified;
    const [isVerificationFailedOpen, setVerificationFailedOpen] = useState(
        emailVerified === 'false',
    );

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<registrationNameEmailData>({
        resolver: yupResolver(registrationNameEmailSchema),
        mode: 'onChange',
    });

    const firstNameValue = watch(RegistrationFieldsEnum.FIRST_NAME);
    const lastNameValue = watch(RegistrationFieldsEnum.LAST_NAME);
    const emailValue = watch(RegistrationFieldsEnum.EMAIL);

    const validInputsCount =
        (!errors.firstName && firstNameValue ? 1 : 0) +
        (!errors.lastName && lastNameValue ? 1 : 0) +
        (!errors.email && emailValue ? 1 : 0);

    const onSubmit = (data: registrationNameEmailData) => {
        dispatch(setFirstPartDataCreateUser(data));
        navigate('/account/finish-registration');
    };
    const progressValue = (validInputsCount / 6) * 100;

    const firstNameReg = register(RegistrationFieldsEnum.FIRST_NAME);
    const lastNameReg = register(RegistrationFieldsEnum.LAST_NAME);
    const emailReg = register(RegistrationFieldsEnum.EMAIL);

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
                    <Text className={styles.form_control}>{AUTH_FORM.STEP_ONE}</Text>
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
                    id={RegistrationFieldsEnum.FIRST_NAME}
                    label={AUTH_FORM.NAME_LABEL}
                    type='text'
                    placeholder={AUTH_FORM.NAME_PLACEHOLDER}
                    autoComplete='off'
                    register={firstNameReg}
                    error={errors.firstName?.message}
                    handleBlur={(e) =>
                        handleBlurTrim(
                            e,
                            RegistrationFieldsEnum.FIRST_NAME,
                            setValue,
                            firstNameReg.onBlur,
                        )
                    }
                    dataTestId={DATA_TEST_ID.FIRST_NAME_INPUT}
                    borderColor={errors.firstName ? 'red' : 'lime.150'}
                />

                <CommonInputField
                    id={RegistrationFieldsEnum.LAST_NAME}
                    label={AUTH_FORM.LAST_NAME_LABEL}
                    type='text'
                    placeholder={AUTH_FORM.LAST_NAME_PLACEHOLDER}
                    autoComplete='off'
                    register={lastNameReg}
                    error={errors.lastName?.message}
                    handleBlur={(e) =>
                        handleBlurTrim(
                            e,
                            RegistrationFieldsEnum.LAST_NAME,
                            setValue,
                            lastNameReg.onBlur,
                        )
                    }
                    dataTestId={DATA_TEST_ID.LAST_NAME_INPUT}
                    borderColor={errors.lastName ? 'red' : 'lime.150'}
                />

                <CommonInputField
                    id={RegistrationFieldsEnum.EMAIL}
                    label={AUTH_FORM.EMAIL_LABEL}
                    type='email'
                    placeholder={AUTH_FORM.EMAIL_PLACEHOLDER}
                    autoComplete='email'
                    register={emailReg}
                    error={errors.email?.message}
                    handleBlur={(e) =>
                        handleBlurTrim(e, RegistrationFieldsEnum.EMAIL, setValue, emailReg.onBlur)
                    }
                    dataTestId={DATA_TEST_ID.EMAIL_INPUT}
                    borderColor={errors.email ? 'red' : 'lime.150'}
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
                    Дальше
                </Button>
            </VStack>
            <VerificationFailedModal
                isShow={isVerificationFailedOpen}
                onClose={() => setVerificationFailedOpen(false)}
            />
        </Flex>
    );
};
