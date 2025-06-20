import {
    Avatar,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    HStack,
    Input,
    VStack,
} from '@chakra-ui/react';

import { useGetMeQuery } from '~/store/slice/api/api-slice';

import styles from './ProfileSettingsPage.module.css';

export const ProfileSettingsPage = () => {
    console.log(1);
    const { data: user } = useGetMeQuery();
    return (
        <VStack alignItems='flex-start' gap={0}>
            <Heading className={styles.title} as='h1' mt={6} mb={4} letterSpacing='0.2px'>
                Авторизация и персонализация{' '}
            </Heading>
            <Avatar size='2xl' mb={4} />
            <VStack as='form' w='100%' gap={6}>
                <HStack w='100%' gap={6}>
                    <FormControl maxW='667px' w='100%'>
                        <FormLabel className={styles.label} mb={1}>
                            Имя
                        </FormLabel>
                        <Input
                            className={styles.input}
                            type='text'
                            size='lg'
                            value={user?.firstName}
                            borderColor='lime.150'
                            color='lime.800'
                        />
                    </FormControl>
                    <FormControl maxW='667px' w='100%'>
                        <FormLabel className={styles.label} mb={1}>
                            Фамилия
                        </FormLabel>
                        <Input
                            className={styles.input}
                            type='text'
                            size='lg'
                            value={user?.lastName}
                            borderColor='lime.150'
                            color='lime.800'
                        />
                    </FormControl>
                </HStack>
                <HStack w='100%' gap={6} alignItems='flex-start'>
                    <FormControl maxW='667px' w='100%'>
                        <FormLabel className={styles.label} mb={1}>
                            Е-mail
                        </FormLabel>
                        <Input
                            className={styles.input}
                            type='email'
                            size='lg'
                            value={user?.email}
                            isDisabled
                            borderColor='white'
                            color='lime.800'
                        />
                    </FormControl>
                    <FormControl maxW='667px' w='100%'>
                        <FormLabel className={styles.label} mb={1}>
                            Логин
                        </FormLabel>
                        <Input
                            className={styles.input}
                            type='text'
                            size='lg'
                            value={user?.login}
                            isDisabled
                            borderColor='white'
                            color='lime.800'
                        />
                        <FormHelperText
                            mt={1}
                            className={styles.hint}
                            letterSpacing='-0.15px'
                            color='alpha.700'
                        >
                            Логин не менее 5 символов, только латиница
                        </FormHelperText>
                    </FormControl>
                </HStack>
                <Button
                    className={styles.button}
                    size='lg'
                    alignSelf='flex-start'
                    variant='ghost'
                    _hover={{}}
                    pl='10px'
                >
                    Сменить пароль
                </Button>
                <Button
                    className={styles.button}
                    size='lg'
                    alignSelf='flex-start'
                    bg='alpha.900'
                    color='white'
                >
                    Сохранить изменения
                </Button>
            </VStack>
        </VStack>
    );
};
