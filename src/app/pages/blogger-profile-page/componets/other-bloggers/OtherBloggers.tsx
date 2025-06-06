import { Button, Grid, Heading, HStack, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { BlogCard } from '~/app/pages/blog-page/companents/blog-card/BlogCard';
import ArrowButton from '~/components/icons/ArrowButton';
import { Author } from '~/type/author';

import styles from './OtherBloggers.module.css';

type OtherBloggersProps = {
    authors: Author[];
};

export const OtherBloggers = ({ authors }: OtherBloggersProps) => (
    <VStack w='100%' gap={{ base: 4, bp95: 6 }}>
        <HStack w='100%' justify='space-between' mt={{ base: 0, bp95: 6 }}>
            <Heading
                className={styles.title}
                as='h2'
                letterSpacing={{ base: ' 0.3px', bp95: '1.5px' }}
            >
                Другие блоги
            </Heading>
            <Button
                className={styles.button}
                size={{ base: 'xs', bp95: 'lg' }}
                variant='ghost'
                _hover={{}}
                rightIcon={<ArrowButton />}
                as={Link}
                to='/blogs'
            >
                Все авторы
            </Button>
        </HStack>
        <Grid
            w='100%'
            templateColumns={{ base: 'repeat(1, 1fr)', bp76: 'repeat(3, 1fr)' }}
            gap={{ base: 3, bp95: 4 }}
            mb={{ base: 4, bp95: 6 }}
        >
            {authors.map((authors) => (
                <BlogCard
                    key={authors._id}
                    author={authors}
                    padding='7px'
                    avatarSize='sm'
                    extraClass='other_bloggers'
                    gapAvatarDescription={2}
                    flexWrap='column-reverse'
                    justifyFloor='flex-end'
                    gapFooter={4}
                />
            ))}
        </Grid>
    </VStack>
);
