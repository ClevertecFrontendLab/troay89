import { SearchIcon } from '@chakra-ui/icons';
import { Avatar, Button, Flex, Icon, Text } from '@chakra-ui/react';

import { avatar } from '~/assets/images/header';
import Home from '~/components/icons/footer/Home';
import Write from '~/components/icons/footer/Writte';

import styles from './FooterMobile.module.css';

function FooterMobile() {
    return (
        <>
            <Flex className={styles.container}>
                <Button className={styles['home_button']}>
                    <Icon as={Home} />
                </Button>
                <Text className={styles.text}>Главная</Text>
            </Flex>
            <Flex className={styles.container}>
                <Icon className={styles['footer_icon']} as={SearchIcon} boxSize={6} />
                <Text className={styles.text}>Поиск</Text>
            </Flex>
            <Flex className={styles.container}>
                <Icon className={styles['footer_icon']} as={Write} boxSize={6} />
                <Text className={styles.text}>Записать</Text>
            </Flex>
            <Flex className={styles.container}>
                <Avatar src={avatar} boxSize={10} />
                <Text className={styles.text}>Мой профиль</Text>
            </Flex>
        </>
    );
}

export default FooterMobile;
