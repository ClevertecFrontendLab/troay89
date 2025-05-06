import { Flex, Image, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import not_404 from './../../../assets/images/404/404.png';
import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => (
    <Flex
        justify='center'
        direction='column'
        align='center'
        mt={{ base: '186px', bp55: '280px', bp95: '300px' }}
        mx='auto'
        w={{ base: '216px', bp95: 'auto' }}
    >
        <Image
            src={not_404}
            alt='not found'
            mb='34px'
            w={{ base: '108px', bp95: '206px' }}
            h={{ base: '108px', bp95: '206px' }}
        />
        <Text className={styles.header} as='h1' my={0} mb='14px'>
            Упс! Такой страницы нет
        </Text>
        <Text className={styles.text}>
            Можете поискать другой рецепт{' '}
            <Link as={RouterLink} to='/' textDecoration='underline'>
                здесь
            </Link>
        </Text>
    </Flex>
);
