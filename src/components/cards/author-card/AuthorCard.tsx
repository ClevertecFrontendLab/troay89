import { Avatar, Card, Flex, Text } from '@chakra-ui/react';

import UserRecommendProps from '~/type/userRecommendProps';

import styles from './AuthorCard.module.css';

function AuthorCard({ nameRecommend, avatarRecommend, email, message }: UserRecommendProps) {
    return (
        <Card className={styles.container}>
            <Flex className={styles['container_about']}>
                <Avatar className={styles.avatar} name={nameRecommend} src={avatarRecommend} />
                <Flex className={styles.about}>
                    <Text
                        className={styles.name}
                        isTruncated
                        maxW={{ base: '235px', bp76: '165px', bp95: '180px', bp189: '295px' }}
                    >
                        {nameRecommend}
                    </Text>
                    <Text className={styles.email}>{email}</Text>
                </Flex>
            </Flex>
            <Flex className={styles.content}>{message}</Flex>
        </Card>
    );
}

export default AuthorCard;
