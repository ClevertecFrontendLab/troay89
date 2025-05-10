import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Progress,
    Text,
    VStack,
} from '@chakra-ui/react';

import styles from './RegistrationPage.module.css';

export const RegistrationPage = () => (
    <Flex align='center' justify='center' w='100%'>
        <VStack as='form' spacing={6} w='full'>
            <VStack w='100%' alignItems='flex-start' gap={0}>
                <Text className={styles.form_control}>Шаг 1. Личная информация</Text>
                <Progress bg='alpha.100' size='sm' value={20} w='100%' colorScheme='lime' />
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
                />
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
                />
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
                />
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
