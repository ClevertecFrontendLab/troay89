import { Box, Spinner } from '@chakra-ui/react';

import { DATA_TEST_ID } from '~/constants/dataTestId';

export const Overlay = () => (
    <Box
        position='fixed'
        width='100vw'
        height='300vh'
        top='50%'
        left='50%'
        transform='translate(-50%, -50%)'
        backgroundColor='alpha.300'
        backdropFilter='blur(4px)'
        borderRadius='8px'
        display='flex'
        alignItems='center'
        justifyContent='center'
        zIndex={2000}
        background='radial-gradient(circle at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 3%)'
    >
        <Spinner data-test-id={DATA_TEST_ID.APP_LOADER} />
    </Box>
);
