import { CloseIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    useDisclosure,
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';
import {
    setListCategory,
    setListTypeDishes,
    setListTypeMeats,
    setResultSearch,
} from '~/store/slice/arrayResultFilterSlice';
import { setZIndex } from '~/store/slice/headerZIndex';

import DrawerFilter from '../drawer-filter/DrawerFilter';
import FilterIcon from '../icons/FilterIcon';
import SearchIcon from '../icons/SearchIcon';
import styles from './SearchFilter.module.css';

function SearchFilter() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const resultSearch = useSelector(
        (state: ApplicationState) => state.arrayResultFilter.resultSearch,
    );
    const [textSearch, setTextSearch] = useState(resultSearch);

    const handleFilterButton = () => {
        onOpen();
        dispatch(setListCategory([]));
        dispatch(setListTypeMeats([]));
        dispatch(setListTypeDishes([]));
    };

    const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setTextSearch(event.target.value);
    };

    const handleClickIconSearch = () => {
        dispatch(setResultSearch(textSearch));
    };

    const handleClickIconClear = () => {
        setTextSearch('');
        dispatch(setResultSearch(''));
    };

    const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleClickIconSearch();
        }
    };

    useEffect(() => {
        dispatch(setZIndex(isOpen));
    }, [dispatch, isOpen]);

    return (
        <Flex className={styles.search_container}>
            <Button
                className={styles.filter}
                onClick={handleFilterButton}
                data-test-id='filter-button'
            >
                <Icon className={styles.filter_icon} as={FilterIcon} boxSize={6} />
            </Button>
            <InputGroup className={styles.search_wrapper}>
                <Input
                    className={styles.search}
                    data-test-id='search-input'
                    placeholder='Название или ингредиент...'
                    value={textSearch}
                    onChange={handleChangeSearch}
                    onKeyDown={handleEnterKeyPress}
                />

                {textSearch.length > 0 && (
                    <InputLeftElement>
                        <Icon
                            position='absolute'
                            as={CloseIcon}
                            top={{ base: 2.5, bp95: 4 }}
                            left={{ base: 245, bp55: 365, bp95: 400 }}
                            height={{ base: '10px', bp95: '14px' }}
                            width={{ base: '10px', bp95: '14px' }}
                            onClick={handleClickIconClear}
                        />
                    </InputLeftElement>
                )}
                <InputRightElement
                    className={styles.search_icon}
                    onClick={handleClickIconSearch}
                    pointerEvents={textSearch.length > 2 ? 'auto' : 'none'}
                >
                    <Icon
                        data-test-id='search-button'
                        as={SearchIcon}
                        height={{ bp95: '22px', base: '17px' }}
                        width={{ bp95: '22px', base: '17px' }}
                    />
                </InputRightElement>
            </InputGroup>
            <DrawerFilter isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
}
<Icon as={SearchIcon} height='22px' width='22px' />;
export default SearchFilter;
