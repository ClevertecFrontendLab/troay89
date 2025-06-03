import { Box, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router';

import { GreenButton } from '~/components/buttons/green-button/GreenButton';
import { AuthorCard } from '~/components/cards/author-card/AuthorCard';
import { Author, AuthorData } from '~/type/author';

import styles from './AuthorBlock.module.css';

type AuthorBlockType = {
    getAllBloggers?: AuthorData;
};

export const AuthorBlock = ({ getAllBloggers }: AuthorBlockType) => {
    const authors = getAllBloggers?.others.slice(0, 3);
    return (
        <Flex className={styles.container}>
            <Flex className={styles.subtitle_container}>
                <Heading className={styles.subtitle} as='h2'>
                    Кулинарные блоги
                </Heading>
                <Box className={styles.button_desktop} as={Link} to='blogs'>
                    <GreenButton text='Все авторы' changeColor />
                </Box>
            </Flex>
            <Flex className={styles.cards_container}>
                {authors?.map((author: Author) => <AuthorCard key={author._id} author={author} />)}
            </Flex>
            <Box className={styles.button_mobile} as={Link} to='blogs'>
                <GreenButton text='Все авторы' changeColor />
            </Box>
        </Flex>
    );
};
