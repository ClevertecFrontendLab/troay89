import { Avatar, Box, Button, Card, Flex, HStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { BloggerStats } from '~/components/blogger-stats/BloggerStats';
import { SubscriptionButton } from '~/components/buttons/subscription-button/SubscriptionButton';
import { OverlayBlock } from '~/components/overlayBlock/overlayBlock';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { STORAGE_KEY } from '~/constants/storageKey';
import { useToggleSubscriptionMutation } from '~/store/slice/api/api-slice';
import { Author } from '~/type/author';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';

import styles from './BlogCard.module.css';

type BlogCardProps = {
    author: Author;
    isExtraSpaceProfile?: boolean;
};

export const BlogCard = ({ author, isExtraSpaceProfile }: BlogCardProps) => {
    const [toggleSubscription, { isLoading }] = useToggleSubscriptionMutation();
    const userId = localStorage.getItem(STORAGE_KEY.DECODED_PAYLOAD) ?? '';

    const handleToggleSubscription = async () => {
        try {
            if (!author) return;
            await toggleSubscription({
                toUserId: author._id,
                fromUserId: userId,
            }).unwrap();
        } catch (error) {
            isFetchBaseQueryError(error);
        }
    };

    const textNewRecipe = author.newRecipesCount === 1 ? 'новый рецепт' : 'новых рецептов';
    const bottomMarginAvatar = isExtraSpaceProfile ? '20px' : '16px';
    const topMarginAvatar = isExtraSpaceProfile ? '4px' : '0';

    return (
        <Card
            className={styles.container}
            px={{ base: '15px', bp95: '23px' }}
            pt={{ base: '15px', bp95: '23px' }}
            pb={{ base: '15px', bp95: '19px' }}
            data-test-id={DATA_TEST_ID.BLOGS_CARD}
        >
            <Flex
                className={styles.container_about}
                mt={{ base: topMarginAvatar, bp95: 0 }}
                mb={{ base: bottomMarginAvatar, bp95: '28px' }}
                gap={3}
            >
                <Avatar className={styles.avatar} name={author.lastName} />
                <Flex className={styles.about} flexDirection='column'>
                    <Text
                        className={styles.name}
                        isTruncated
                        data-test-id={DATA_TEST_ID.BLOGS_CARD_NAME}
                        // maxW={{ base: '235px', bp76: '165px', bp95: '180px', bp189: '295px' }}
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
                mb='20px'
                data-test-id={DATA_TEST_ID.BLOGS_CARD_NOTES_TEXT}
            >
                {author.notes[0]?.text}
            </Text>
            <HStack justify='space-between'>
                <HStack gap={2}>
                    {!author.isFavorite ? (
                        <SubscriptionButton
                            isFavorite={false}
                            handleToggleSubscription={handleToggleSubscription}
                        />
                    ) : (
                        <Button
                            className={styles.button}
                            variant='solid'
                            size='xs'
                            bg='lime.400'
                            as={Link}
                            to={`/blogs/${author._id}`}
                            data-test-id={DATA_TEST_ID.BLOGS_CARD_RECIPES_BUTTON}
                        >
                            Рецепты
                        </Button>
                    )}
                    <Button
                        className={styles.button}
                        as={Link}
                        to={`/blogs/${author._id}#notes`}
                        variant='outline'
                        size='xs'
                        colorScheme='lime'
                        data-test-id={DATA_TEST_ID.BLOGS_CARD_NOTES_BUTTON}
                    >
                        Читать
                    </Button>
                </HStack>
                <BloggerStats
                    bookmarksCount={author.bookmarksCount}
                    subscribersCount={author.subscribersCount}
                />
            </HStack>
            {author.newRecipesCount !== 0 && (
                <Box
                    className={styles.label}
                    px={2}
                    py='2px'
                    bg='alpha.100'
                    pos='absolute'
                    top={2}
                    right={2}
                    borderRadius={1}
                    data-test-id={DATA_TEST_ID.BLOGS_CARD_NEW_RECIPES_BADGE}
                >{`${author.newRecipesCount} ${textNewRecipe}`}</Box>
            )}
            {isLoading && <OverlayBlock />}
        </Card>
    );
};
