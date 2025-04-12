import { Flex, Heading, Text } from '@chakra-ui/react';

import AllergenSort from '../allergen-sort/AllergenSort';
import SearchFilter from '../search-filter/SearchFilter';
import styles from './Toolbar.module.css';

type ToolbarProps = {
    title: string;
    description?: string;
    isExtraSpace?: boolean;
};

function Toolbar({ title, description, isExtraSpace }: ToolbarProps) {
    return (
        <Flex
            className={`${styles.container} ${isExtraSpace && styles['extra_space']}`}
            direction='column'
        >
            <Flex className={styles['container_title']}>
                <Heading className={styles.title} as='h1'>
                    {title}
                </Heading>
                {description && (
                    <Text className={styles['heading_description']}>{description}</Text>
                )}
            </Flex>
            <SearchFilter />
            <AllergenSort />
        </Flex>
    );
}

export default Toolbar;
