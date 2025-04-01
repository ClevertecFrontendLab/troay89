import { Avatar as UserAvatar, Box } from '@chakra-ui/react';

import avatar from './../../../../assets/images/header/avatar.png';
import styles from './Avatar.module.css';

function Avatar() {
    return (
        <Box className={styles['avatar-container']}>
            <UserAvatar size='md' name='random user' src={avatar} />
            <Box className={styles['avatar-info']}>
                <span className={styles['avatar-name']}>Екатерина Константинопольская</span>
                <span className={styles['avatar-email']}>@bake_and_pie</span>
            </Box>
        </Box>
    );
}

export default Avatar;
