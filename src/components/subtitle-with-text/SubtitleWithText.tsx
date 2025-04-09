import { Flex, Heading, Text } from '@chakra-ui/react';

import styles from './SubtitleWithText.module.css';

type SubtitleWithTextProps = {
    title: string;
    text: string;
    isChangeTable?: boolean;
};

function SubtitleWithText({ title, text, isChangeTable }: SubtitleWithTextProps) {
    return (
        <Flex className={styles['subtitle_container']}>
            <Heading
                className={`${styles.subtitle} ${isChangeTable && styles['change_table']}`}
                as='h2'
            >
                {title}
            </Heading>
            <Text className={styles.description}>{text}</Text>
        </Flex>
    );
}

export default SubtitleWithText;
