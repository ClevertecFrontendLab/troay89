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
    <VStack w='100%' gap={6}>
        <HStack w='100%' justify='space-between' mt={6}>
            <Heading className={styles.title} as='h2' letterSpacing='1.5px'>
                Другие блоги
            </Heading>
            <Button
                className={styles.button}
                size='lg'
                variant='ghost'
                _hover={{}}
                rightIcon={<ArrowButton />}
                as={Link}
                to='/blogs'
            >
                Все авторы
            </Button>
        </HStack>
        <Grid w='100%' templateColumns='repeat(3, 1fr)' gap={4} mb={6}>
            {authors.map((authors) => (
                <BlogCard author={authors} />
            ))}
        </Grid>
    </VStack>
);
