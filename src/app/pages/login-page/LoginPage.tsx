import { Button, Flex, FormControl, FormLabel, Input, Link, VStack } from '@chakra-ui/react';

import styles from './LoginPage.module.css';

export const LoginPage = () => (
    <Flex align='center' justify='center' w='100%' flexDir='column'>
        <VStack as='form' spacing={6} w='full'>
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
                />
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
                />
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
