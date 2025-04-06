import { Avatar, Flex } from '@chakra-ui/react';

import UserRecomendProps from '~/type/userRecomendProps';

import styles from './UserRecomend.module.css';

function UserRecomend({ nameRecomend, avatarRecomend }: UserRecomendProps) {
    return (
        <Flex className={styles.container}>
            <Avatar className={styles.avatar} name='Alex Cook' src={avatarRecomend} />
            {nameRecomend}
        </Flex>
    );
}

export default UserRecomend;
