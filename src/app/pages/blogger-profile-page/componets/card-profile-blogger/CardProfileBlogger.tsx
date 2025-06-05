import { Avatar, Heading, HStack, Text, VStack } from '@chakra-ui/react';

import { BloggerStats } from '~/components/blogger-stats/BloggerStats';
import { SubscriptionButton } from '~/components/buttons/subscription-button/SubscriptionButton';
import { BloggerData } from '~/type/bloggerData';

import styles from './CardProfileBlogger.module.css';

type CardProfileBloggerProps = {
    dataBlogger?: BloggerData;
};

export const CardProfileBlogger = ({ dataBlogger }: CardProfileBloggerProps) => {
    const name = `${dataBlogger?.bloggerInfo.firstName} ${dataBlogger?.bloggerInfo.lastName}`;
    const login = `@${dataBlogger?.bloggerInfo.login}`;
    return (
        <HStack
            pos='fixed'
            left={256}
            right={256}
            zIndex={100}
            gap={8}
            justify='center'
            pt='16px'
            align='flex-start'
            pb={10}
            bg='white'
        >
            <Avatar size='2xl' />
            <VStack align='flex-start' gap={3}>
                <Heading className={styles.title} as='h1' mt='6px' mb={0}>
                    {name}
                </Heading>
                <Text className={styles.text} color='alpha.700'>
                    {login}
                </Text>
                <HStack gap='52px'>
                    <SubscriptionButton isFavorite={true} />
                    <BloggerStats
                        bookmarksCount={dataBlogger?.totalBookmarks}
                        subscribersCount={dataBlogger?.totalSubscribers}
                    />
                </HStack>
            </VStack>
        </HStack>
    );
};
