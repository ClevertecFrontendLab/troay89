import { Avatar, Box, Button, Card, Flex, HStack, Spinner, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { BloggerStats } from '~/components/blogger-stats/BloggerStats';
import { SubscriptionButton } from '~/components/buttons/subscription-button/SubscriptionButton';
import { STORAGE_KEY } from '~/constants/storageKey';
import { useToggleSubscriptionMutation } from '~/store/slice/api/api-slice';
import { Author } from '~/type/author';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';

import styles from './BlogCard.module.css';

type BlogCarddProps = {
    author: Author;
};

export const BlogCard = ({ author }: BlogCarddProps) => {
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

    return (
        <Card
            className={styles.container}
            px={{ base: '15px', bp95: '23px' }}
            pt={{ base: '15px', bp95: '23px' }}
            pb={{ base: '15px', bp95: '19px' }}
        >
            <Flex className={styles.container_about} mb={{ base: '16px', bp95: '28px' }} gap={3}>
                <Avatar className={styles.avatar} name={author.lastName} />
                <Flex className={styles.about} flexDirection='column'>
                    <Text
                        className={styles.name}
                        isTruncated
                        // maxW={{ base: '235px', bp76: '165px', bp95: '180px', bp189: '295px' }}
                    >
                        {`${author.firstName} ${author.lastName}`}
                    </Text>
                    <Text className={styles.email}>{`@${author.login}`}</Text>
                </Flex>
            </Flex>
            <Text className={styles.content} minH='60px' mb='20px'>
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
                >{`${author.newRecipesCount} ${textNewRecipe}`}</Box>
            )}
            {isLoading && (
                <Flex
                    w={{ base: '40px', bp115: '100px' }}
                    h={{ base: '40px', bp115: '100px' }}
                    position='absolute'
                    top='50%'
                    left='50%'
                    transform='translate(-50%, -50%)'
                    background='radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%);'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Spinner data-test-id='loader-search-block' />
                </Flex>
            )}
        </Card>
    );
};
