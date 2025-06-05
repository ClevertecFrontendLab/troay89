import { Button, Grid, Heading, HStack, VStack } from '@chakra-ui/react';

import { BlogCard } from '~/app/pages/blog-page/companents/blog-card/BlogCard';
import ArrowButton from '~/components/icons/ArrowButton';
import { Author } from '~/type/author';

import styles from './OtherBlogers.module.css';

type OtherBlogersProps = {
    authors: Author[];
};

export const OtherBlogers = ({ authors }: OtherBlogersProps) => (
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
