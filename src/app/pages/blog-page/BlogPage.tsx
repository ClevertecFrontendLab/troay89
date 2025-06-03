import { Box, Grid, Heading, VStack } from '@chakra-ui/react';

import { AuthorCard } from '~/components/cards/author-card/AuthorCard';
import { useGetBloggersQuery, useGetRecipesQuery } from '~/store/slice/api/api-slice';
import { Author } from '~/type/author';

import { NewBlock } from '../about-recipe-page/components/new-block/NewBlock';
import styles from './BLogPage.module.css';

export const BlogPage = () => {
    const { data: swiperData } = useGetRecipesQuery({
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'asc',
    });
    const { data: authors } = useGetBloggersQuery();
    console.log(authors, 'blogers');
    // const bigArray = [...authors?.others, ...authors?.others, ...authors?.others];
    return (
        <Box px={{ base: 4, bp55: 0 }}>
            <Heading mt={8} mb={6} className={styles.title} as='h1' textAlign='center'>
                Кулинарные блоги
            </Heading>
            <VStack p={{ base: 3, bp95: 6 }} borderRadius='8px' bg='lime.300' mb={10} gap={4}>
                <Heading className={styles.subtitle} as='h2' alignSelf='flex-start'>
                    Избранные блоги
                </Heading>
                <Grid
                    templateColumns={{ base: 'repeat(1, 1fr)', bp60: 'repeat(2, 1fr)' }}
                    gap={{ base: 3, bp95: 4 }}
                >
                    {authors?.others?.map((author: Author) => (
                        <AuthorCard key={author._id} author={author} />
                    ))}
                </Grid>
            </VStack>
            <VStack p={{ base: 4, bp95: 6 }} borderRadius='8px' bg='alpha.50' mb={10}>
                <Grid
                    templateColumns={{
                        base: 'repeat(1, 1fr)',
                        bp60: 'repeat(2, 1fr)',
                        bp160: 'repeat(3, 1fr)',
                    }}
                    rowGap={{ base: 4, bp95: 6 }}
                    columnGap={4}
                >
                    {authors?.others?.map((author: Author) => (
                        <AuthorCard key={author._id} author={author} />
                    ))}
                </Grid>
            </VStack>
            {swiperData && <NewBlock swipeData={swiperData.data} />}
        </Box>
    );
};
