import { Box, Button, Grid, Heading, Icon, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { NewBlock } from '~/app/pages/about-recipe-page/components/new-block/NewBlock';
import ArrowButton from '~/components/icons/ArrowButton';
import { withLoader } from '~/components/with-loader/WithLoader';
import { Author, AuthorData } from '~/type/author';
import { RecipeTypeResponse } from '~/type/RecipeType';

import { BlogCard } from '../blog-card/BlogCard';
import styles from './BlogContent.module.css';

type BlogContentProps = {
    isErrorAuthors: boolean;
    showAll: boolean;
    setLimit: (count: string) => void;
    authorsToShow?: Author[];
    authors?: AuthorData;
    swiperData?: RecipeTypeResponse;
};

const BlogContent = ({
    isErrorAuthors,
    authors,
    showAll,
    authorsToShow,
    swiperData,
    setLimit,
}: BlogContentProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isErrorAuthors) {
            navigate('/', { state: { isErrorGetAuthor: true } });
        }
    });

    return (
        <Box px={{ base: 4, bp55: 0 }}>
            <Heading
                mt={{ base: 4, bp160: 8 }}
                mb={{ base: 6, bp160: 6 }}
                className={styles.title}
                as='h1'
                textAlign='center'
                letterSpacing={{ bp76: '0.3px', bp95: '1.2px' }}
            >
                Кулинарные блоги
            </Heading>
            {authors?.favorites.length !== 0 && (
                <VStack
                    p={{ base: 3, bp95: 6 }}
                    borderRadius='16px'
                    bg='lime.300'
                    mb={{ base: 8, bp95: 10 }}
                    gap={{ base: 3, bp95: 4 }}
                >
                    <Heading
                        className={styles.subtitle}
                        as='h2'
                        alignSelf='flex-start'
                        letterSpacing={{ base: '0.4px', bp95: '1.5px' }}
                    >
                        Избранные блоги
                    </Heading>
                    <Grid
                        w='100%'
                        templateColumns={{ base: 'repeat(1, 1fr)', bp60: 'repeat(2, 1fr)' }}
                        gap={{ base: 3, bp95: 4 }}
                    >
                        {authors?.favorites?.map((author: Author) => (
                            <BlogCard key={author._id} author={author} isExtraSpaceProfile={true} />
                        ))}
                    </Grid>
                </VStack>
            )}
            <VStack
                p={{ base: 4, bp95: 6 }}
                borderRadius='8px'
                bg='alpha.50'
                mb={{ base: 3, bp76: 8, bp95: 10 }}
                gap={{ base: 4, bp95: 6 }}
            >
                <Grid
                    w='100%'
                    templateColumns={{
                        base: 'repeat(1, 1fr)',
                        bp60: 'repeat(2, 1fr)',
                        bp160: 'repeat(3, 1fr)',
                    }}
                    rowGap={{ base: 4, bp95: 6 }}
                    columnGap={4}
                >
                    {authorsToShow?.map((author: Author, index) => (
                        <BlogCard key={index} author={author} />
                    ))}
                </Grid>
                {!showAll ? (
                    <Button
                        className={styles.show_all}
                        color='black'
                        variant='ghost'
                        size='lg'
                        onClick={() => setLimit('50')}
                    >
                        Все авторы
                        <Icon ml='8px' as={ArrowButton} />
                    </Button>
                ) : (
                    <Button
                        className={styles.show_all}
                        color='black'
                        variant='ghost'
                        size='lg'
                        onClick={() => setLimit('9')}
                    >
                        <Icon mr='8px' transform='rotate(180deg)' as={ArrowButton} />
                        Свернуть
                    </Button>
                )}
            </VStack>
            {swiperData && <NewBlock swipeData={swiperData.data} />}
        </Box>
    );
};

export const BlogContentWithLoader = withLoader(BlogContent);
