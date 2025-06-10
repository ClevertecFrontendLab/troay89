import { Flex, Spinner } from '@chakra-ui/react';

import { DATA_TEST_ID } from '~/constants/dataTestId';

export const OverlayBlock = () => (
    <Flex
        w={{ base: '40px', bp115: '100px' }}
        h={{ base: '40px', bp115: '100px' }}
        position='absolute'
        top='50%'
        left='50%'
        transform='translate(-50%, -50%)'
        background='radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%);'
        justifyContent='center'
        alignItems='center'
        data-test-id={DATA_TEST_ID.MOBILE_LOADER}
    >
        <Spinner />
    </Flex>
);
