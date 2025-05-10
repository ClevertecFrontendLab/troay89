import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { accountLayout } from '~/assets/images/account-layout';
import { Logo } from '~/components/icons/logo/Logo';

import styles from './AccountLayout.module.css';

export const AccountLayout = () => (
    <Flex
        bg='linear-gradient(208deg, #eaffc7 0%, #29813f 100%);'
        overflowY='hidden'
        h='100vh'
        position='relative'
    >
        <Flex flexDirection='column' w='45vw' flex='1'>
            <Box mx='auto' mt='170px' mb='80px'>
                <Icon as={Logo} w='270px' h='64px' mr={1} />
            </Box>
            <Box as='main'>
                <Outlet />
            </Box>
            <Box className={styles.text} as='footer' ml='30px' mb='30px' mt='auto'>
                Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
            </Box>
        </Flex>
        <Image src={accountLayout} alt='мясное блюдо на столе' w='55vw' flex='1' />
        <Text className={styles.text} position='absolute' bottom='30px' right='30px'>
            – Лучший сервис для ваших кулинарных побед{' '}
        </Text>
    </Flex>
);
