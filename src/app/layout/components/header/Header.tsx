import { Box, Center, Flex, GridItem, Icon } from '@chakra-ui/react';
import { Link } from 'react-router';

import Burger from '~/components/icons/burger';
import FirstPart from '~/components/icons/logo/FirstPart';
import SecondPart from '~/components/icons/logo/SecondPart';

import Avatar from '../avatar/Avatar';
import Bread from '../bread/Bread';
import IconStats from '../icon-stats/IconStats';
import styles from './Header.module.css';

function Header() {
    return (
        <GridItem className={styles.header} as='header' data-test-id='header'>
            <Box className={styles['header_container']}>
                <Flex as={Link} to='/'>
                    <Icon as={FirstPart} boxSize={8} />
                    <Icon className={styles['second_part']} as={SecondPart} />
                </Flex>
                <Center>
                    <Bread />
                </Center>
            </Box>
            <Flex className={styles['header_container_mobile']}>
                <IconStats isHeader />
                <Burger className={styles.burger} boxSize={6} />
            </Flex>
            <Avatar />
        </GridItem>
    );
}

export default Header;
