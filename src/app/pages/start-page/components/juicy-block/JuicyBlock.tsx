import { Flex } from '@chakra-ui/react';

import GeneraCard from '~/components/cards/card/GeneralCard';
import dataRecipes from '~/data/dataRecipes';

import styles from './JuicyBlock.module.css';

function JuicyBlock() {
    const juiceRecipe = [...dataRecipes]
        .sort((firstRecipe, secondRecipe) => secondRecipe.likes - firstRecipe.likes)
        .slice(0, 4);

    return (
        <Flex className={styles.juicy}>
            {juiceRecipe.map(
                ({ id, image, title, description, category, bookmarks, likes }, index) => (
                    <GeneraCard
                        key={id}
                        id={id}
                        image={image}
                        title={title}
                        description={description}
                        label={category}
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
