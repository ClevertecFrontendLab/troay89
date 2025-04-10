import { Avatar, Card, Flex, Text } from '@chakra-ui/react';

import UserRecomendProps from '~/type/userRecomendProps';

import styles from './AuthorCard.module.css';

function AuthorCard({ nameRecomend, avatarRecomend, email, message }: UserRecomendProps) {
    return (
        <Card className={styles.container}>
            <Flex className={styles['container_about']}>
                <Avatar className={styles.avatar} name='' src={avatarRecomend} />
                <Flex className={styles.about}>
                    <Text className={styles.name}>{nameRecomend}</Text>
                    <Text className={styles.email}>{email}</Text>
                </Flex>
            </Flex>
            <Flex className={styles.content}>{message}</Flex>
        </Card>
    );
}

export default AuthorCard;
