import { Avatar, Card, Flex, Text } from '@chakra-ui/react';

import { DATA_TEST_ID } from '~/constants/dataTestId';
import { Author } from '~/type/author';

import styles from './AuthorCard.module.css';

type AuthorCardProps = {
    author: Author;
};

export const AuthorCard = ({ author }: AuthorCardProps) => (
    <Card className={styles.container}>
        <Flex className={styles.container_about}>
            <Avatar className={styles.avatar} name={author.lastName} />
            <Flex className={styles.about}>
                <Text
                    className={styles.name}
                    isTruncated
                    maxW={{ base: '235px', bp76: '165px', bp95: '180px', bp189: '295px' }}
                    data-test-id={DATA_TEST_ID.BLOGS_CARD_NAME}
                >
                    {`${author.firstName} ${author.lastName}`}
                </Text>
                <Text
                    className={styles.email}
                    data-test-id={DATA_TEST_ID.BLOGS_CARD_LOGIN}
                >{`@${author.login}`}</Text>
            </Flex>
        </Flex>
        <Text
            className={styles.content}
            minH='60px'
            data-test-id={DATA_TEST_ID.BLOGS_CARD_NOTES_TEXT}
        >
            {author.notes[0]?.text}
        </Text>
    </Card>
);
