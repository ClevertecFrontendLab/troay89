import { Text } from '@chakra-ui/react';

type HighlightTextProps = {
    text: string;
    query: string;
};

export const HighlightText: React.FC<HighlightTextProps> = ({ text, query }) => {
    if (!query) return <Text>{text}</Text>;

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    const parts = text.split(regex);

    return (
        <Text>
            {parts.map((part, index) => {
                const isMatch = part.toLowerCase() === query.toLowerCase();
                return isMatch ? (
                    <Text as='span' key={index} color='lime.600'>
                        {part}
                    </Text>
                ) : (
                    <Text as='span' key={index}>
                        {part}
                    </Text>
                );
            })}
        </Text>
    );
};
