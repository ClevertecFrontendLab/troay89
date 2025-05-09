import { Flex, Heading, Text } from '@chakra-ui/react';

import styles from './SubtitleWithText.module.css';

type SubtitleWithTextProps = {
    title: string;
    text?: string;
};

function SubtitleWithText({ title, text }: SubtitleWithTextProps) {
    return (
        <Flex className={styles.subtitle_container}>
            <Heading className={styles.subtitle} as='h2'>
                {title}
            </Heading>
            <Text className={styles.description}>{text}</Text>
        </Flex>
    );
}

export default SubtitleWithText;
