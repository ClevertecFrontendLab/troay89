import { Avatar as UserAvatar, Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

import { getSaveUserProfile } from '~/store/selectors/getInfoMeSelector';

import styles from './Avatar.module.css';

export const Avatar = () => {
    const user = useSelector(getSaveUserProfile);
    const fullName = `${user.firstName} ${user.secondName}`;
    return (
        <Box className={styles.avatar_container} as={Link} to='/profile'>
            <UserAvatar size='md' name={fullName} src={user.avatar} />
            <Box className={styles.avatar_info}>
                <span className={styles.avatar_name}>{fullName}</span>
                <span className={styles.avatar_email}>{user.email}</span>
            </Box>
        </Box>
    );
};
