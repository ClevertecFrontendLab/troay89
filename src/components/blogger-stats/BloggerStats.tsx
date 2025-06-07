import { HStack, Icon, Text } from '@chakra-ui/react';

import { DATA_TEST_ID } from '~/constants/dataTestId';

import BookMark from '../icons/BookMark';
import PeopleEmpty from '../icons/PeopleEmpty';
import styles from './BloggerStats.module.css';

type BloggerStatsProps = {
    bookmarksCount?: number;
    subscribersCount?: number;
};

export const BloggerStats = ({ bookmarksCount, subscribersCount }: BloggerStatsProps) => (
    <HStack gap={4}>
        {bookmarksCount && (
            <HStack gap={0} data-test-id={DATA_TEST_ID.BLOGGER_FOLLOWERS_BOOKMARKS}>
                <Icon as={BookMark} boxSize='12px' alignSelf='center' />{' '}
                <Text className={styles.number_stat} color='lime.600' p={1}>
                    {bookmarksCount}
                </Text>
            </HStack>
        )}
        {subscribersCount && (
            <HStack gap={0} data-test-id={DATA_TEST_ID.BLOGGER_FOLLOWERS_COUNT}>
                <Icon as={PeopleEmpty} boxSize='12px' alignSelf='center' />{' '}
                <Text className={styles.number_stat} color='lime.600' p={1}>
                    {subscribersCount}
                </Text>
            </HStack>
        )}
    </HStack>
);
