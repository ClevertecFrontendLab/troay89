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
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import { useBlurValidatedFields } from '~/hooks/useBlurValidatedFields';

import styles from './RegistrationPageOne.module.css';

type RegistrationOneData = {
    firstName: string;
    lastName: string;
    email: string;
};

const registrationOneSchema = yup
    .object({
        firstName: yup
            .string()
            .required('Введите имя')
            .matches(/^[А-Я]/, 'Должно начинаться с кириллицы А-Я')
            .matches(/^[А-Я][а-я-]*$/, 'Только кириллица А-Я, и "-"')
            .max(50, 'Максимальная длина 50 символов'),
        lastName: yup
            .string()
            .required('Введите фамилию')
            .matches(/^[А-Я]/, 'Должно начинаться с кириллицы А-Я')
            .matches(/^[А-Я][а-я-]*$/, 'Только кириллица А-Я, и "-"')
            .max(50, 'Максимальная длина 50 символов'),
        email: yup
            .string()
            .required('Введите e-mail')
            .email('Введите корректный e-mail')
            .max(50, 'Максимальная длина 50 символов')
            .matches(/\.[A-Za-z]{2,}$/, 'Введите корректный e-mail'),
    })
    .required();

export const RegistrationOnePage = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<RegistrationOneData>({
        resolver: yupResolver(registrationOneSchema),
        mode: 'onBlur',
    });

    const { validatedFields, handleBlur } = useBlurValidatedFields<RegistrationOneData>(trigger);

    const validInputsCount =
        (validatedFields.firstName ? 1 : 0) +
        (validatedFields.lastName ? 1 : 0) +
        (validatedFields.email ? 1 : 0);

    const onSubmit = (data: RegistrationOneData) => {
        console.log('Step 1 data:', data);
        navigate('/account/finish-registration');
    };
    const progressValue = (validInputsCount / 6) * 100;

    const firstNameReg = register('firstName');
    const lastNameReg = register('lastName');
    const emailPasswordReg = register('email');

    return (
        <Flex align='center' justify='center' w='100%'>
            <VStack as='form' noValidate spacing={1} w='full' onSubmit={handleSubmit(onSubmit)}>
                <VStack w='100%' alignItems='flex-start' gap={0} mb={5}>
                    <Text className={styles.form_control}>Шаг 1. Личная информация</Text>
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
                        onBlur={(e) => handleBlur('firstName', e, firstNameReg.onBlur)}
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
                        onBlur={(e) => handleBlur('lastName', e, lastNameReg.onBlur)}
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
                        {...emailPasswordReg}
                        onBlur={(e) => handleBlur('email', e, emailPasswordReg.onBlur)}
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
                >
                    Дальше
                </Button>
            </VStack>
        </Flex>
    );
};
