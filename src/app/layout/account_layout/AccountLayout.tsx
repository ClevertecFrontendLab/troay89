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
        <Flex
            flexDirection='column'
            w={{ base: '49.1vw', bp160: '45vw' }}
            flex='1'
            pl={{ base: '1px', bp115: '4px', bp160: '24px' }}
        >
            <Box
                mx='auto'
                mt={{ base: '72px', bp95: '140px', bp115: '170px' }}
                mb={{ base: '40px', bp95: '56px', bp115: '80px' }}
            >
                <Icon
                    as={Logo}
                    w={{ base: '158px', bp115: '270px' }}
                    h={{ base: '38px', bp115: '64px' }}
                    mr={{ base: 0, bp115: 7 }}
                />
            </Box>
            <Box as='main'>
                <Outlet />
            </Box>
            <Box
                className={styles.text}
                as='footer'
                ml={{ base: '26px', bp160: '31px' }}
                mb={{ base: '25px', bp160: '31px' }}
                mt='auto'
            >
                Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
            </Box>
        </Flex>
        <Image
            src={accountLayout}
            alt='мясное блюдо на столе'
            w={{ base: '50.9vw', bp160: '55vw' }}
            flex='1'
            display={{ base: 'none', bp115: 'block' }}
        />
        <Text
            className={styles.text}
            position='absolute'
            bottom='30px'
            right='30px'
            display={{ base: 'none', bp115: 'block' }}
        >
            – Лучший сервис для ваших кулинарных побед{' '}
        </Text>
    </Flex>
);
