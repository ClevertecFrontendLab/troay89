import { Flex, Heading, Text } from '@chakra-ui/react';

import styles from './SubtitleWithText.module.css';

type SubtitleWithTextProps = {
    title: string;
    text?: string;
};

export const SubtitleWithText = ({ title, text }: SubtitleWithTextProps) => (
    <Flex className={styles.subtitle_container}>
        <Heading className={styles.subtitle} as='h2'>
            {title}
        </Heading>
        <Text className={styles.description}>{text}</Text>
    </Flex>
);
