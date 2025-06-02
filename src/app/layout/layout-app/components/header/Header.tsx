import { CloseIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, GridItem, Icon, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import classNames from 'classnames';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router';

import { BurgerMenu } from '~/components/burger-menu/BurgerMemu';
import Burger from '~/components/icons/burger';
import FirstPart from '~/components/icons/logo/FirstPart';
import SecondPart from '~/components/icons/logo/SecondPart';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { URLS_PATH } from '~/constants/urlsPath';
import { zIndexLessSelector } from '~/store/selectors/zIndexLessSelector';

import { Avatar } from '../avatar/Avatar';
import { Bread } from '../bread/Bread';
import { IconStats } from '../icon-stats/IconStats';
import styles from './Header.module.css';

export const Header = () => {
    const { pathname } = useLocation();
    const showComponent =
        pathname !== URLS_PATH.NEW_RECIPE && !pathname.startsWith(URLS_PATH.EDIT_RECIPE);
    const { isOpen, onToggle, onClose } = useDisclosure();
    const btnRef = useRef<SVGSVGElement | null>(null);
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const zIndexLess = useSelector(zIndexLessSelector);
    const zIndex = zIndexLess ? 400 : 1401;

    return (
        <GridItem
            className={classNames(styles.header, { [styles.mobile_open_drawer]: isOpen })}
            as='header'
            data-test-id={DATA_TEST_ID.HEADER}
            zIndex={zIndex}
        >
            <Box className={styles.header_container}>
                <Flex as={Link} to='/' data-test-id={DATA_TEST_ID.HEADER_LOGO}>
                    <Icon as={FirstPart} boxSize={8} />
                    <Icon className={styles.second_part} as={SecondPart} />
                </Flex>
                {isDesktop && (
                    <Center>
                        <Bread />
                    </Center>
                )}
            </Box>
            <Flex className={styles.header_container_mobile}>
                {!isOpen && showComponent && <IconStats isHeader />}
                {isOpen ? (
                    <CloseIcon
                        onClick={onToggle}
                        boxSize={3}
                        my='18px'
                        mx='10px'
                        data-test-id={DATA_TEST_ID.CLOSE_ICON}
                    />
                ) : (
                    <Burger
                        ref={btnRef}
                        className={styles.burger}
                        boxSize={6}
                        onClick={onToggle}
                        data-test-id={DATA_TEST_ID.HAMBURGER_ICON}
                    />
                )}
            </Flex>
            <Avatar />
            <BurgerMenu isOpen={isOpen} onClose={onClose} />
        </GridItem>
    );
};
