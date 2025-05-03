import { Box, Spinner } from '@chakra-ui/react';

export const Overlay = () => (
    <Box
        position='fixed'
        width='100vw'
        height='300vh'
        top='50%'
        left='50%'
        transform='translate(-50%, -50%)'
        backgroundColor='rgba(0, 0, 0, 0.16)'
        backdropFilter='blur(4px)'
        borderRadius='8px'
        display='flex'
        alignItems='center'
        justifyContent='center'
        zIndex={2000}
        background='radial-gradient(circle at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 3%)'
    >
        <Spinner />
    </Box>
);
