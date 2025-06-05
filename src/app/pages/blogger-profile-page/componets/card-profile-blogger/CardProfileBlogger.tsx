import { Avatar, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { BloggerStats } from '~/components/blogger-stats/BloggerStats';
import { SubscriptionButton } from '~/components/buttons/subscription-button/SubscriptionButton';
import { OverlayBlock } from '~/components/overlayBlock/overlayBlock';
import { STORAGE_KEY } from '~/constants/storageKey';
import { useToggleSubscriptionMutation } from '~/store/slice/api/api-slice';
import { BloggerData } from '~/type/bloggerData';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';

import styles from './CardProfileBlogger.module.css';

type CardProfileBloggerProps = {
    dataBlogger?: BloggerData;
};

export const CardProfileBlogger = ({ dataBlogger }: CardProfileBloggerProps) => {
    const name = `${dataBlogger?.bloggerInfo.firstName} ${dataBlogger?.bloggerInfo.lastName}`;
    const login = `@${dataBlogger?.bloggerInfo.login}`;
    const [toggleSubscription, { isLoading }] = useToggleSubscriptionMutation();
    const [isFavorite, setIsFavorite] = useState(false);
    const userId = localStorage.getItem(STORAGE_KEY.DECODED_PAYLOAD) ?? '';

    const handleToggleSubscription = async () => {
        try {
            if (!dataBlogger) return;
            await toggleSubscription({
                toUserId: dataBlogger.bloggerInfo._id,
                fromUserId: userId,
            }).unwrap();
            setIsFavorite((prev: boolean) => !prev);
        } catch (error) {
            isFetchBaseQueryError(error);
        }
    };

    useEffect(() => {
        if (dataBlogger) {
            setIsFavorite(dataBlogger?.isFavorite);
        }
    }, [dataBlogger]);

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
                    <SubscriptionButton
                        isFavorite={isFavorite}
                        handleToggleSubscription={handleToggleSubscription}
                    />
                    <BloggerStats
                        bookmarksCount={dataBlogger?.totalBookmarks}
                        subscribersCount={dataBlogger?.totalSubscribers}
                    />
                </HStack>
            </VStack>
            {isLoading && <OverlayBlock />}
        </HStack>
    );
};
