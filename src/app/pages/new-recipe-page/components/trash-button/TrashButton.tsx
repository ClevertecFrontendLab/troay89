import { Box, Icon } from '@chakra-ui/react';

import { Garbage } from '~/components/icons/Garbage';

type TrashButtonType = {
    title: string;
    onClick: () => void;
    dataTestId?: string;
};

export const TrashButton = ({ title, onClick, dataTestId }: TrashButtonType) => (
    <Box as='button' boxSize={8} title={title} flexShrink={0} data-test-id={dataTestId}>
        <Icon as={Garbage} onClick={onClick} boxSize='14px' />
    </Box>
);
