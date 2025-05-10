import { Flex, Heading, useMediaQuery } from '@chakra-ui/react';
import { Link } from 'react-router';

import { GreenButton } from '~/components/buttons/green-button/GreenButton';
import GeneraCard from '~/components/cards/card/GeneralCard';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import RecipeType from '~/type/RecipeType';

import styles from './JuicyBlock.module.css';

type JuicyBlockType = {
    juicyData: RecipeType[] | undefined;
};

export const JuicyBlock = ({ juicyData }: JuicyBlockType) => {
    const [isTablet] = useMediaQuery('(min-width: 767px)');
    const [isDesktop] = useMediaQuery('(min-width: 1200px)');
    const veryCrazyHardDataTestMobileId = isDesktop
        ? 'juiciest-link-mobile'
        : isTablet
          ? 'juiciest-link'
          : 'juiciest-link-mobile';

    const veryCrazyHardDataTestIdDesktop = isDesktop
        ? 'juiciest-link'
        : isTablet
          ? ''
          : 'juiciest-link';
    return (
        <>
            <Flex className={styles.subtitle_container}>
                <Heading className={styles.subtitle} as='h2'>
                    Самое сочное
                </Heading>
                <Link
                    className={styles.button_desktop}
                    to='/the-juiciest'
                    data-test-id={veryCrazyHardDataTestIdDesktop}
                >
                    <GreenButton text='Вся подборка' />
                </Link>
            </Flex>
            <Flex className={styles.juicy}>
                {juicyData?.map(
                    (
                        { _id, image, title, description, categoriesIds, bookmarks, likes },
                        index,
                    ) => (
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
                data-test-id={veryCrazyHardDataTestMobileId}
            >
                <GreenButton text='Вся подборка' />
            </Link>
        </>
    );
};
