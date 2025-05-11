import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Link,
    Text,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import styles from './LoginPage.module.css';

type LoginData = {
    login: string;
    password: string;
};

const loginSchema = yup
    .object({
        login: yup.string().required('Введите логин').max(50, 'Максимальная длина 50 символов'),
        password: yup.string().required('Введите пароль').max(50, 'Максимальная длина 50 символов'),
    })
    .required();

export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: yupResolver(loginSchema),
        mode: 'onBlur',
    });

    const onSubmit = (data: LoginData) => {
        console.log('Step 1 data:', data);
    };

    return (
        <Flex
            align='center'
            justify='center'
            w='100%'
            flexDir='column'
            onSubmit={handleSubmit(onSubmit)}
        >
            <VStack as='form' spacing={1} w='full'>
                <FormControl id='login'>
                    <FormLabel className={styles.form_control} mb={1}>
                        Логин для входа на сайт
                    </FormLabel>
                    <Input
                        className={styles.form_input}
                        type='text'
                        placeholder='Введите логин'
                        bg='white'
                        size='lg'
                        _focus={{ boxShadow: 'none' }}
                        borderColor={errors.login ? 'red' : 'lime.150'}
                        {...register('login')}
                    />
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
                        placeholder='Пароль для сайта'
                        bg='white'
                        size='lg'
                        borderColor={errors.password ? 'red' : 'lime.150'}
                        _focus={{ boxShadow: 'none' }}
                        {...register('password')}
                    />
                    {errors.password ? (
                        <Text className={styles.message} color='red.500' mt={1}>
                            {errors.password.message}
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
                    mt='88px'
                    mb={4}
                    colorScheme='teal'
                >
                    Войти
                </Button>
            </VStack>
            <Link className={styles.link}>Забыли логин или пароль?</Link>
        </Flex>
    );
};
