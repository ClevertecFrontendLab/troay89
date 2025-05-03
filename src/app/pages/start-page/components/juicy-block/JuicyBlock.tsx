import { Flex } from '@chakra-ui/react';

import GeneraCard from '~/components/cards/card/GeneralCard';
import RecipeType from '~/type/RecipeType';

import styles from './JuicyBlock.module.css';

type JuicyBlockType = {
    juicyData: RecipeType[] | undefined;
};

function JuicyBlock({ juicyData }: JuicyBlockType) {
    return (
        <Flex className={styles.juicy}>
            {juicyData &&
                juicyData.map(
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
                            dataTestButton={`card-link-${index}`}
                        />
                    ),
                )}
        </Flex>
    );
}

export default JuicyBlock;
