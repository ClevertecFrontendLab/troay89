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
import classNames from 'classnames';
import { ChangeEvent, RefObject, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';

import { DATA_TEST_ID } from '~/constants/dataTestId';
import { resultSearchSelector } from '~/store/selectors/arrayResultFilterSelector';
import { shouldShowFilterResultsSelector } from '~/store/selectors/overlayPositionSelector';
import {
    setAllResult,
    setListCategory,
    setListTypeDishes,
    setListTypeMeats,
    setResultFilter,
    setResultSearch,
} from '~/store/slice/arrayResultFilterSlice';
import { setZIndex } from '~/store/slice/headerZIndex';
import { setOverlayPosition } from '~/store/slice/overlayPosition';

import { DrawerFilter } from '../drawer-filter/DrawerFilter';
import FilterIcon from '../icons/FilterIcon';
import SearchIcon from '../icons/SearchIcon';
import styles from './SearchFilter.module.css';

type SearchFilterType = {
    listAllergin: string[];
    prevPathRef: RefObject<string | null>;
};

export const SearchFilter = ({ listAllergin, prevPathRef }: SearchFilterType) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const shouldShowFilterResults = useSelector(shouldShowFilterResultsSelector);
    const resultSearch = useSelector(resultSearchSelector);
    const [isSearchRecipes, setIsSearchRecipes] = useState(false);
    const [textSearch, setTextSearch] = useState(resultSearch);

    const { id } = useParams();
    const pointerEventsSearchIcon = textSearch.length > 2 || listAllergin.length ? 'auto' : 'none';

    const resetParamsFilter = () => {
        dispatch(setListCategory([]));
        dispatch(setListTypeMeats([]));
        dispatch(setListTypeDishes([]));
        dispatch(setAllResult([]));
        dispatch(setResultSearch(''));
        setTextSearch('');
        setIsSearchRecipes(false);
        dispatch(setOverlayPosition(true));
    };

    const handleFilterButton = () => {
        resetParamsFilter();
        onOpen();
    };

    const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setTextSearch(event.target.value);
        if (isSearchRecipes === true) {
            setIsSearchRecipes(false);
        }
    };

    const handleClickIconSearch = () => {
        dispatch(setOverlayPosition(false));
        dispatch(setResultSearch(textSearch));
        dispatch(setResultFilter(listAllergin));
    };

    const handleClickIconClear = () => {
        setIsSearchRecipes(false);
        setTextSearch('');
        dispatch(setResultSearch(''));
    };

    const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleClickIconSearch();
        }
    };

    useEffect(() => {
        if (prevPathRef.current !== location.pathname && !id) {
            resetParamsFilter();
            prevPathRef.current = location.pathname;
        }
    }, [location.pathname, prevPathRef, id]);

    useEffect(() => {
        if (resultSearch.length > 2) {
            setIsSearchRecipes(shouldShowFilterResults);
        }
    }, [resultSearch.length, shouldShowFilterResults]);

    useEffect(() => {
        dispatch(setZIndex(isOpen));
    }, [dispatch, isOpen]);

    return (
        <Flex className={styles.search_container}>
            <Button
                className={styles.filter}
                onClick={handleFilterButton}
                data-test-id={DATA_TEST_ID.FILTER_BUTTON}
            >
                <Icon className={styles.filter_icon} as={FilterIcon} boxSize={6} />
            </Button>
            <InputGroup className={styles.search_wrapper}>
                <Input
                    className={classNames(styles.search, { [styles.not_found]: isSearchRecipes })}
                    data-test-id={DATA_TEST_ID.SEARCH_INPUT}
                    placeholder='Название или ингредиент...'
                    value={textSearch}
                    onChange={handleChangeSearch}
                    onKeyDown={handleEnterKeyPress}
                    _focus={{ boxShadow: 'none' }}
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
                    pointerEvents={pointerEventsSearchIcon}
                >
                    <Icon
                        data-test-id={DATA_TEST_ID.SEARCH_BUTTON}
                        as={SearchIcon}
                        height={{ bp95: '22px', base: '17px' }}
                        width={{ bp95: '22px', base: '17px' }}
                    />
                </InputRightElement>
            </InputGroup>
            <DrawerFilter isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
};
