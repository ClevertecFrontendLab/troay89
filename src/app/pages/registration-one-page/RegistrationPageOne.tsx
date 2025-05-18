import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Progress,
    Text,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Location, useLocation, useNavigate } from 'react-router';

import { VerificationFailedModal } from '~/components/modal/verification-failded-module/VerificationFailedModal';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { setFirstPartDataCreateUser } from '~/store/slice/firstPartDataCreateUser';
import { handleBlurTrim } from '~/utils/TrimOnBlur';

import { RegistrationOneData, registrationOneSchema } from './registrationOneSchema';
import styles from './RegistrationPageOne.module.css';

type VerificationState = {
    emailVerified?: 'true' | 'false' | undefined;
};

export const RegistrationOnePage = () => {
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
    } = useForm<RegistrationOneData>({
        resolver: yupResolver(registrationOneSchema),
        mode: 'onChange',
    });

    const firstNameValue = watch('firstName');
    const lastNameValue = watch('lastName');
    const emailValue = watch('email');

    const validInputsCount =
        (!errors.firstName && firstNameValue ? 1 : 0) +
        (!errors.lastName && lastNameValue ? 1 : 0) +
        (!errors.email && emailValue ? 1 : 0);

    const onSubmit = (data: RegistrationOneData) => {
        dispatch(setFirstPartDataCreateUser(data));
        navigate('/account/finish-registration');
    };
    const progressValue = (validInputsCount / 6) * 100;

    const firstNameReg = register('firstName');
    const lastNameReg = register('lastName');
    const emailReg = register('email');

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
                    <Text className={styles.form_control}>Шаг 1. Личная информация</Text>
                    <Progress
                        bg='alpha.100'
                        size='sm'
                        value={progressValue}
                        w='100%'
                        colorScheme='lime'
                        data-test-id={DATA_TEST_ID.SING_UP_PROGRESS}
                    />
                </VStack>
                <FormControl id='firstName'>
                    <FormLabel className={styles.form_control} mb={1}>
                        Ваше имя
                    </FormLabel>
                    <Input
                        className={styles.form_input}
                        type='text'
                        placeholder='Имя'
                        bg='white'
                        size='lg'
                        borderColor={errors.firstName ? 'red' : 'lime.150'}
                        _focus={{ boxShadow: 'none' }}
                        {...firstNameReg}
                        onBlur={(e) =>
                            handleBlurTrim(e, 'firstName', setValue, firstNameReg.onBlur)
                        }
                        data-test-id={DATA_TEST_ID.FIRST_NAME_INPUT}
                    />
                    {errors.firstName ? (
                        <Text className={styles.message} color='red.500' mt={1}>
                            {errors.firstName.message}
                        </Text>
                    ) : (
                        <Box h={5}></Box>
                    )}
                </FormControl>

                <FormControl id='lastName'>
                    <FormLabel className={styles.form_control} mb={1}>
                        Ваша фамилия
                    </FormLabel>
                    <Input
                        className={styles.form_input}
                        type='text'
                        placeholder='Фамилия'
                        bg='white'
                        size='lg'
                        borderColor={errors.lastName ? 'red' : 'lime.150'}
                        _focus={{ boxShadow: 'none' }}
                        {...lastNameReg}
                        onBlur={(e) => handleBlurTrim(e, 'lastName', setValue, lastNameReg.onBlur)}
                        data-test-id={DATA_TEST_ID.LAST_NAME_INPUT}
                    />
                    {errors.lastName ? (
                        <Text className={styles.message} color='red.500' mt={1}>
                            {errors.lastName.message}
                        </Text>
                    ) : (
                        <Box h={5}></Box>
                    )}
                </FormControl>

                <FormControl id='email'>
                    <FormLabel className={styles.form_control} mb={1}>
                        Ваш e-mail
                    </FormLabel>
                    <Input
                        className={styles.form_input}
                        type='email'
                        placeholder='e-mail'
                        bg='white'
                        size='lg'
                        borderColor={errors.email ? 'red' : 'lime.150'}
                        _focus={{ boxShadow: 'none' }}
                        {...emailReg}
                        onBlur={(e) => handleBlurTrim(e, 'email', setValue, emailReg.onBlur)}
                        data-test-id={DATA_TEST_ID.EMAIL_INPUT}
                    />
                    {errors.email ? (
                        <Text className={styles.message} color='red.500' mt={1}>
                            {errors.email.message}
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
