import { CloseIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, GridItem, Icon, useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';
import { Link } from 'react-router';

import BurgerMenu from '~/components/burger-menu/BurgerMemu';
import Burger from '~/components/icons/burger';
import FirstPart from '~/components/icons/logo/FirstPart';
import SecondPart from '~/components/icons/logo/SecondPart';

import Avatar from '../avatar/Avatar';
import Bread from '../bread/Bread';
import IconStats from '../icon-stats/IconStats';
import styles from './Header.module.css';

function Header() {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const btnRef = useRef<SVGSVGElement | null>(null);

    return (
        <GridItem
            className={`${styles.header} ${isOpen && styles.mobile_open_drawer}`}
            as='header'
            data-test-id='header'
            zIndex='1401'
        >
            <Box className={styles.header_container}>
                <Flex as={Link} to='/'>
                    <Icon as={FirstPart} boxSize={8} />
                    <Icon className={styles.second_part} as={SecondPart} />
                </Flex>
                <Center>
                    <Bread />
                </Center>
            </Box>
            <Flex className={styles.header_container_mobile}>
                {isOpen || <IconStats isHeader />}
                {isOpen ? (
                    <CloseIcon onClick={onToggle} boxSize={3} my='18px' mx='10px' />
                ) : (
                    <Burger ref={btnRef} className={styles.burger} boxSize={6} onClick={onToggle} />
                )}
            </Flex>
            <Avatar />
            <BurgerMenu isOpen={isOpen} onClose={onClose} />
        </GridItem>
    );
}

export default Header;
