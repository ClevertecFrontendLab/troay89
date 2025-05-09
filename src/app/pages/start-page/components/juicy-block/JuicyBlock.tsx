import { Flex } from '@chakra-ui/react';

import GeneraCard from '~/components/cards/card/GeneralCard';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import RecipeType from '~/type/RecipeType';

import styles from './JuicyBlock.module.css';

type JuicyBlockType = {
    juicyData: RecipeType[] | undefined;
};

function JuicyBlock({ juicyData }: JuicyBlockType) {
    return (
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
    );
}

export default JuicyBlock;
