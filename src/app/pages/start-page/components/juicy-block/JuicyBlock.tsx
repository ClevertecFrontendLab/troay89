import { Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router';

import { GreenButton } from '~/components/buttons/green-button/GreenButton';
import GeneraCard from '~/components/cards/card/GeneralCard';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import RecipeType from '~/type/recipeType';

import styles from './JuicyBlock.module.css';

type JuicyBlockType = {
    juicyData: RecipeType[] | undefined;
};

export const JuicyBlock = ({ juicyData }: JuicyBlockType) => (
    <>
        <Flex className={styles.subtitle_container}>
            <Heading className={styles.subtitle} as='h2'>
                Самое сочное
            </Heading>
            <Link className={styles.button_desktop} to='/the-juiciest' data-test-id='juiciest-link'>
                <GreenButton text='Вся подборка' />
            </Link>
        </Flex>
        <Flex className={styles.juicy}>
            {juicyData?.map(
                ({ _id, image, title, description, categoriesIds, bookmarks, likes }, index) => (
                    <GeneraCard
                        key={_id}
                        _id={_id}
                        image={image}
                        title={title}
                        description={description}
                        categoriesIds={categoriesIds}
                        favorites={bookmarks}
                        like={likes}
                        dataTestButton={`${DATA_TEST_ID.CARD_LINK}-${index}`}
                    />
                ),
            )}
        </Flex>
        <Link
            className={styles.button_mobile}
            to='/the-juiciest'
            data-test-id='juiciest-link-mobile'
        >
            <GreenButton text='Вся подборка' />
        </Link>
    </>
);
