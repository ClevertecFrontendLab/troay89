import { Button, Flex } from '@chakra-ui/react';

import GeneraCard from '~/components/cards/card/GeneralCard';
import RecipeType from '~/type/RecipeType';

import styles from './FilterSortBlock.module.css';

type FilterSearchBlockProps = {
    filterSearchRecipes: RecipeType[];
};

function FilterSortBlock({ filterSearchRecipes }: FilterSearchBlockProps) {
    return (
        <Flex mb={{ bp95: 10, base: 8 }} flexDir='column' alignItems='center'>
            <Flex className={styles.card_container} mb={4} gap={4}>
                {filterSearchRecipes.map(
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
                            dataTest={`food-card-${index}`}
                            dataTestButton={`card-link-${index}`}
                        />
                    ),
                )}
            </Flex>
            <Button className={styles.button} colorScheme='teal' px='17.5px'>
                Загрузить еще
            </Button>
        </Flex>
    );
}

export default FilterSortBlock;
