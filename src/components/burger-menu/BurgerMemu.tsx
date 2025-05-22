import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';

import { AccordionMenu } from '~/app/layout/layout-app/components/accordion/AccordionMenu';
import { Bread } from '~/app/layout/layout-app/components/bread/Bread';
import { FooterDesktop } from '~/app/layout/layout-app/components/footerDesktop/FooterDesktop';

type BurgerMenuProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const BurgerMenu = ({ isOpen, onClose }: BurgerMenuProps) => (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='sm'>
        <DrawerOverlay backgroundColor='rgba(0, 0, 0, 0.16)' backdropFilter='blur(4px)' />
        <DrawerContent
            h='calc(100vh - 84px)'
            maxW='344px'
            right={{ base: '8px !important', bp76: '12px !important' }}
            borderBottomRadius='12px'
            boxShadow='0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1);'
        >
            <DrawerHeader pt='80px' pb='30px' px='20px'>
                <Bread isMobile onClose={onClose} />
            </DrawerHeader>
            <AccordionMenu />
            <DrawerFooter as='div' pt='28px' pb='32px' px='24px' justifyContent='flex-start'>
                <FooterDesktop />
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
);
