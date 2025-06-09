import { Avatar, Card, CardBody, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { SubscriptionButton } from '~/components/buttons/subscription-button/SubscriptionButton';
import PeopleEmpty from '~/components/icons/PeopleEmpty';
import { OverlayBlock } from '~/components/overlayBlock/overlayBlock';
import { STORAGE_KEY } from '~/constants/storageKey';
import { useToggleSubscriptionMutation } from '~/store/slice/api/api-slice';
import { BloggerData } from '~/type/bloggerData';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';

import styles from './AuthorCard.module.css';

type AuthorCardProps = {
    bloggerData?: BloggerData;
};

export const AuthorCard = ({ bloggerData }: AuthorCardProps) => {
    const [toggleSubscription, { isLoading }] = useToggleSubscriptionMutation();
    const userId = localStorage.getItem(STORAGE_KEY.DECODED_PAYLOAD) ?? '';
    const username =
        bloggerData &&
        bloggerData.bloggerInfo &&
        `${bloggerData.bloggerInfo.firstName} ${bloggerData.bloggerInfo.lastName}`;
    const login = bloggerData && bloggerData.bloggerInfo && `@${bloggerData.bloggerInfo.login}`;

    const [isFavorite, setIsFavorite] = useState(false);

    const handleToggleSubscription = async () => {
        try {
            if (!bloggerData) return;
            await toggleSubscription({
                toUserId: bloggerData?.bloggerInfo._id,
                fromUserId: userId,
            }).unwrap();
            setIsFavorite((prev) => !prev);
        } catch (error) {
            isFetchBaseQueryError(error);
        }
    };

    useEffect(() => {
        if (bloggerData) {
            setIsFavorite(bloggerData?.isFavorite);
        }
    }, [bloggerData]);

    return (
        <Card className={styles.card} direction='row' shadow='none'>
            <Avatar
                src={username}
                name={username}
                boxSize={24}
                my={{ base: 3, bp76: 6 }}
                ml={{ base: 3, bp76: 6 }}
            />
            <CardBody
                pl={{ base: 2, bp76: 4 }}
                pr={{ base: 2, bp76: 6 }}
                pt={{ base: 2, bp76: 6 }}
                pb={{ base: 3, bp76: 6 }}
            >
                <Flex
                    justify='space-between'
                    direction={{ base: 'column-reverse', bp76: 'row' }}
                    mb={{ base: 0, bp76: 1 }}
                >
                    <Heading className={styles.name} as='h2'>
                        {username}
                    </Heading>
                    <Text className={styles.text} alignSelf={{ base: 'flex-end', bp76: 'unset' }}>
                        Автор рецепта
                    </Text>
                </Flex>
                <Text className={styles.email} mb={4}>
                    {login}
                </Text>
                <Flex justify='space-between'>
                    <SubscriptionButton
                        isFavorite={isFavorite}
                        handleToggleSubscription={handleToggleSubscription}
                    />
                    <Flex
                        className={styles.stats}
                        align='center'
                        gap='7px'
                        mr={{ base: 2, bp76: 1 }}
                    >
                        <Icon className={styles.icon} as={PeopleEmpty} boxSize={3} />
                        {bloggerData?.totalSubscribers}
                    </Flex>
                </Flex>
                {isLoading && <OverlayBlock />}
            </CardBody>
        </Card>
    );
};
