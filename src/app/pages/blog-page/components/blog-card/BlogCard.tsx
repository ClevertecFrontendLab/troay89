import { Avatar, Box, Button, Card, Flex, HStack, Text } from '@chakra-ui/react';
import classNames from 'classnames';
import { Link } from 'react-router';

import { BloggerStats } from '~/components/blogger-stats/BloggerStats';
import { SubscriptionButton } from '~/components/buttons/subscription-button/SubscriptionButton';
import { OverlayBlock } from '~/components/overlayBlock/overlayBlock';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { STORAGE_KEY } from '~/constants/storageKey';
import { useToggleSubscriptionMutation } from '~/store/slice/api/api-slice';
import { Author } from '~/type/author';
import { getNewRecipeText } from '~/utils/getNewRecipeText';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';

import styles from './BlogCard.module.css';

type BlogCardProps = {
    author: Author;
    isExtraSpaceProfile?: boolean;
    padding?: string;
    avatarSize?: string;
    extraClass?: string;
    gapAvatarDescription?: number;
    flexWrap?: 'column-reverse' | 'row';
    justifyFloor?: 'space-between' | 'flex-end';
    gapFooter?: number;
    isShowBadge?: boolean;
    specialFontClass?: string;
};

export const BlogCard = ({
    author,
    isExtraSpaceProfile,
    isShowBadge,
    padding = '15px',
    avatarSize = 'md',
    extraClass = '',
    gapAvatarDescription = 3,
    flexWrap = 'row',
    justifyFloor = 'space-between',
    gapFooter = 2,
    specialFontClass = '',
}: BlogCardProps) => {
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

    const count = author.newRecipesCount;
    const textNewRecipe = getNewRecipeText(count);
    const bottomMarginAvatar = isExtraSpaceProfile ? '16px' : '16px';
    const topMarginAvatar = isExtraSpaceProfile ? '8px' : '0';

    return (
        <Card
            className={styles.container}
            px={{ base: padding, bp95: '23px' }}
            pt={{ base: padding, bp95: '23px' }}
            pb={{ base: padding, bp95: '19px' }}
            data-test-id={DATA_TEST_ID.BLOGS_CARD}
        >
            <Flex
                className={styles.container_about}
                mt={{ base: topMarginAvatar, bp95: 0 }}
                mb={{ base: bottomMarginAvatar, bp95: '28px' }}
                gap={{ base: gapAvatarDescription, bp95: 3 }}
            >
                <Avatar
                    className={styles.avatar}
                    name={author.lastName}
                    size={{ base: avatarSize, bp95: 'md' }}
                    alignSelf='center'
                />
                <Flex className={styles.about} flexDirection='column'>
                    <Text
                        className={classNames(styles.name, styles[extraClass])}
                        isTruncated
                        maxWidth='180px'
                        title={`${author.firstName} ${author.lastName}`}
                        data-test-id={DATA_TEST_ID.BLOGS_CARD_NAME}
                    >
                        {`${author.firstName} ${author.lastName}`}
                    </Text>
                    <Text
                        className={classNames(styles.email, styles[extraClass])}
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
            <HStack
                justify={{ base: justifyFloor, bp95: 'space-between' }}
                flexDir={{ base: flexWrap, bp95: 'row' }}
                gap={{ base: gapFooter, bp95: 2 }}
                alignItems='flex-end'
            >
                <HStack gap='7px'>
                    {!author.isFavorite ? (
                        <SubscriptionButton
                            isFavorite={false}
                            handleToggleSubscription={handleToggleSubscription}
                        />
                    ) : (
                        <Button
                            className={classNames(styles.button, styles[specialFontClass])}
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
                        className={classNames(styles.button, styles[specialFontClass])}
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
            {author.newRecipesCount !== 0 && isShowBadge && (
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
