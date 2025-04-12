import { Avatar, Flex } from '@chakra-ui/react';

import UserRecommendProps from '~/type/userRecommendProps';

import styles from './UserRecommend.module.css';

function UserRecommend({ nameRecommend, avatarRecommend }: UserRecommendProps) {
    return (
        <Flex className={styles.container}>
            <Avatar className={styles.avatar} name='Alex Cook' src={avatarRecommend} />
            {nameRecommend}
        </Flex>
    );
}

export default UserRecommend;
