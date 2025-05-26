import { AddIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

type CustomPlusProps = {
    title: string;
    bg: string;
    boxSize: string;
    boxSizeIcon: string;
    colorIcon: string;
    type: 'div' | 'button';
    alignSelf?: 'flex-end';
    mb?: string;
    onClick?: () => void;
};

export const CustomPlus = ({
    title,
    bg,
    boxSize,
    boxSizeIcon,
    colorIcon,
    type,
    alignSelf,
    mb,
    onClick,
}: CustomPlusProps) => (
    <Flex
        as={type}
        flexShrink={0}
        justify='center'
        alignItems='center'
        bg={bg}
        alignSelf={alignSelf}
        borderRadius='50%'
        boxSize={boxSize}
        border='1px  solid black'
        mb={mb}
        onClick={onClick}
        title={title}
    >
        <AddIcon boxSize={boxSizeIcon} color={colorIcon} />
    </Flex>
);
