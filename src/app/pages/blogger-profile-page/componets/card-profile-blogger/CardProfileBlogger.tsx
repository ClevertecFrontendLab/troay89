import { Avatar, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { BloggerStats } from '~/components/blogger-stats/BloggerStats';
import { SubscriptionButton } from '~/components/buttons/subscription-button/SubscriptionButton';
import { OverlayBlock } from '~/components/overlayBlock/overlayBlock';
import { STORAGE_KEY } from '~/constants/storageKey';
import { useToggleSubscriptionMutation } from '~/store/slice/api/api-slice';
import { setSaveUsername } from '~/store/slice/saveUsernameSlice';
import { BloggerData } from '~/type/bloggerData';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';

import styles from './CardProfileBlogger.module.css';

type CardProfileBloggerProps = {
    dataBlogger?: BloggerData;
};

export const CardProfileBlogger = ({ dataBlogger }: CardProfileBloggerProps) => {
    const dispatch = useDispatch();
    const name = `${dataBlogger?.bloggerInfo.firstName} ${dataBlogger?.bloggerInfo.lastName}`;
    const login = `@${dataBlogger?.bloggerInfo.login}`;
    const [toggleSubscription, { isLoading }] = useToggleSubscriptionMutation();
    const [isFavorite, setIsFavorite] = useState(false);
    const userId = localStorage.getItem(STORAGE_KEY.DECODED_PAYLOAD) ?? '';
    const usernameBread = `${name} (${login})`;
    dispatch(setSaveUsername(usernameBread));

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
            left={{ base: 0, bp144: 256 }}
            right={{ base: 0, bp144: 256 }}
            zIndex={100}
            gap={{ base: 6, bp95: 8 }}
            justify='center'
            pt='16px'
            align='flex-start'
            pb={{ base: 4, bp95: 10 }}
            bg='white'
            flexDir={{ base: 'column', bp76: 'row' }}
            alignItems={{ base: 'center', bp76: 'unset' }}
            px={4}
        >
            <Avatar size={{ base: 'xl', bp95: '2xl' }} />
            <VStack
                align={{ base: 'center', bp76: 'flex-start' }}
                gap={3}
                w={{ base: '100%', bp76: 'fit-content' }}
            >
                <Heading className={styles.title} as='h1' mt={{ base: 0, bp95: '6px' }} mb={0}>
                    {name}
                </Heading>
                <Text className={styles.text} color='alpha.700'>
                    {login}
                </Text>
                <HStack
                    gap={{ base: '63px', bp95: '52px' }}
                    justify={{ base: 'space-between', bp76: 'unset' }}
                    w={{ base: '100%' }}
                    mb={{ base: 2, bp76: 0 }}
                >
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
