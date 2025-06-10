import { Box, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router';

import { GreenButton } from '~/components/buttons/green-button/GreenButton';
import { AuthorCard } from '~/components/cards/author-card/AuthorCard';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { Author, AuthorData } from '~/type/author';

import styles from './AuthorBlock.module.css';

type AuthorBlockType = {
    getAllBloggers?: AuthorData;
};

export const AuthorBlock = ({ getAllBloggers }: AuthorBlockType) => (
    <Flex className={styles.container} data-test-id={DATA_TEST_ID.MAIN_PAGE_BLOGS_BOX}>
        <Flex className={styles.subtitle_container}>
            <Heading className={styles.subtitle} as='h2'>
                Кулинарные блоги
            </Heading>
            <Box
                className={styles.button_desktop}
                as={Link}
                to='blogs'
                data-test-id={DATA_TEST_ID.MAIN_PAGE_BLOGS_BUTTON}
            >
                <GreenButton text='Все авторы' changeColor />
            </Box>
        </Flex>
        <Flex className={styles.cards_container} data-test-id={DATA_TEST_ID.MAIN_PAGE_BLOGS_GRID}>
            {getAllBloggers?.others?.map((author: Author) => (
                <AuthorCard key={author._id} author={author} />
            ))}
        </Flex>
        <Box className={styles.button_mobile} as={Link} to='blogs'>
            <GreenButton
                text='Все авторы'
                changeColor
                data-test-id={DATA_TEST_ID.MAIN_PAGE_BLOGS_BUTTON}
            />
        </Box>
    </Flex>
);
