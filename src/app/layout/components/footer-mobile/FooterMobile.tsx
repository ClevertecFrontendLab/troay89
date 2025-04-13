import { SearchIcon } from '@chakra-ui/icons';
import { Avatar, Button, Flex, GridItem, Icon, Text } from '@chakra-ui/react';

import { avatar } from '~/assets/images/header';
import Home from '~/components/icons/footer/Home';
import Write from '~/components/icons/footer/Writte';

import styles from './FooterMobile.module.css';

function FooterMobile() {
    return (
        <GridItem className={styles.footer} as='footer' data-test-id='footer'>
            <Flex className={`${styles.container} ${styles.radial}`}>
                <Button className={`${styles['footer_item']} ${styles['home_button']}`}>
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
                <Avatar className={styles['footer_item']} src={avatar} boxSize={10} />
                <Text className={styles.text}>Мой профиль</Text>
            </Flex>
        </GridItem>
    );
}

export default FooterMobile;
