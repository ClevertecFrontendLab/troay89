import { Avatar, Flex } from '@chakra-ui/react';

import styles from './UserRecomend.module.css';

type UserRecomend = {
    nameRecomend?: string;
    avatarRecomend?: string;
};

function UserRecomend({ nameRecomend, avatarRecomend }: UserRecomend) {
    return (
        <Flex className={styles.container}>
            <Avatar className={styles.avatar} name='Alex Cook' src={avatarRecomend} />
            {nameRecomend}
        </Flex>
    );
}

export default UserRecomend;
