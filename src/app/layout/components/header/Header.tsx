import { Box, Center, GridItem, Image } from '@chakra-ui/react';

import Avatar from '../avatar/Avatar';
import Bread from '../bread/Bread';
import logo from './../../../../assets/images/header/logo.png';
import styles from './Header.module.css';

function Header() {
    return (
        <GridItem className={styles.header} as='header'>
            <Box className={styles['header_container']}>
                <Image src={logo} alt='logo' />
                <Center>
                    <Bread />
                </Center>
            </Box>
            <Avatar />
        </GridItem>
    );
}

export default Header;
