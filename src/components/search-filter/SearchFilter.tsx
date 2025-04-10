import { Button, Flex, Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import FilterIcon from '../icons/FilterIcon';
import SearchIcon from '../icons/SearchIcon';
import styles from './SearchFilter.module.css';

function SearchFilter() {
    return (
        <Flex className={styles['search_container']}>
            <Button className={styles.filter}>
                <Icon className={styles['filter_icon']} as={FilterIcon} boxSize={6} />
            </Button>
            <InputGroup className={styles['search_wrapper']}>
                <Input className={styles.search} placeholder='Название или ингредиент...' />
                <InputRightElement className={styles['search_icon']}>
                    <Icon as={SearchIcon} boxSize={18} />
                </InputRightElement>
            </InputGroup>
        </Flex>
    );
}

export default SearchFilter;
