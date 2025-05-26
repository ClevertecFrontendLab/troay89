import { Box, Icon } from '@chakra-ui/react';

import { Garbage } from '~/components/icons/Garbage';

type TrashButtonType = {
    title: string;
    onClick: () => void;
};

export const TrashButton = ({ title, onClick }: TrashButtonType) => (
    <Box as='button' boxSize={8} title={title}>
        <Icon as={Garbage} onClick={onClick} boxSize='14px' />
    </Box>
);
