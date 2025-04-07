import { Flex, Heading } from '@chakra-ui/react';

import GreenButton from '~/components/buttons/green-button/GreenButton';
import AuthorCard from '~/components/cards/author-card/AuthorCard';
import dataAuthorCards from '~/data/dataAuthorCards';
import UserRecomendProps from '~/type/userRecomendProps';

import styles from './AuthorBlock.module.css';

function AuthorBlock() {
    return (
        <Flex className={styles.container}>
            <Flex className={styles['subtitle_container']}>
                <Heading className={styles.subtitle} as='h2'>
                    Кулинарные блоги
                </Heading>
                <GreenButton text='Все авторы' changeColor />
            </Flex>
            <Flex className={styles['cards_container']}>
                {dataAuthorCards.map(
                    (
                        { nameRecomend, avatarRecomend, email, message }: UserRecomendProps,
                        index,
                    ) => (
                        <AuthorCard
                            key={index}
                            nameRecomend={nameRecomend}
                            avatarRecomend={avatarRecomend}
                            email={email}
                            message={message}
                        />
                    ),
                )}
            </Flex>
        </Flex>
    );
}

export default AuthorBlock;
