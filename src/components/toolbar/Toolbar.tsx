import { Flex, Heading } from '@chakra-ui/react';

import AllergenSort from '../allergen-sort/AllergenSort';
import SearchFilter from '../search-filter/SearchFilter';
import styles from './Toolbar.module.css';

type ToolbarProps = {
    title: string;
};

function Toolbar({ title }: ToolbarProps) {
    return (
        <Flex className={styles.container} direction='column'>
            <Heading className={styles.title} as='h1'>
                {title}
            </Heading>
            <SearchFilter />
            <AllergenSort />
        </Flex>
    );
}

export default Toolbar;
