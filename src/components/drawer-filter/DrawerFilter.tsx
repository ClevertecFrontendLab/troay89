import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    Icon,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { DATA_TEST_ID } from '~/constants/dataTestId';
import { dataAuthor } from '~/data/dataAuthor';
import { dataCategory } from '~/data/dataCategory';
import { dataGarnish } from '~/data/dataGarnish';
import { dataTypeMeat } from '~/data/dataTypeMeat';
import {
    setAllResult,
    setListCategory,
    setListTypeDishes,
    setListTypeMeats,
    setResultFilter,
} from '~/store/slice/arrayResultFilterSlice';

import { AllergenSort } from '../allergen-sort/AllergenSort';
import { GreenTags } from '../green-tags/GreenTags';
import CloseDrawer from '../icons/CloseDrawer';
import { ListItemWithCheckBox } from '../list_Item_with_checkbox/ListItemWithCheckBox';
import { MultiSelect } from '../multi-select/MultiSelect';
import styles from './DrawerFilter.module.css';

type DrawerFilterProps = {
    isOpen: boolean;
    resetTrigger: boolean;
    onClose: () => void;
};

export const DrawerFilter = ({ isOpen, onClose, resetTrigger }: DrawerFilterProps) => {
    const dispatch = useDispatch();

    const [authors, setAuthors] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [typeMeats, setTypeMeats] = useState<string[]>([]);
    const [typeDishes, setTypeDishes] = useState<string[]>([]);
    const [typeAllergin, setTypeAllergin] = useState<string[]>([]);
    const [typeAll, setTypeAll] = useState<string[]>([]);

    const isDisabled = !(
        authors.length ||
        categories.length ||
        typeMeats.length ||
        typeDishes.length ||
        typeAllergin.length
    );

    useEffect(() => {
        setTypeAll([...typeMeats, ...typeDishes, ...categories, ...typeAllergin]);
    }, [categories, typeAllergin, typeDishes, typeMeats]);

    const resetState = () => {
        dispatch(setListCategory([]));
        dispatch(setListTypeMeats([]));
        dispatch(setListTypeDishes([]));
        dispatch(setAllResult([]));
        setCategories([]);
        setTypeMeats([]);
        setTypeDishes([]);
        setTypeAll([]);
    };

    const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
        dispatch(setResultFilter([]));
        setTypeAllergin([]);
        e.preventDefault();
        resetState();
    };

    useEffect(() => {
        resetState();
    }, [resetTrigger]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setListCategory(categories));
        dispatch(setListTypeMeats(typeMeats));
        dispatch(setListTypeDishes(typeDishes));
        dispatch(setResultFilter(typeAllergin));
        dispatch(setAllResult(typeAll));
    };

    const handleRemoveTag = (item: string) => {
        setCategories((prev) => prev.filter((category) => category !== item));
        setTypeMeats((prev) => prev.filter((meat) => meat !== item));
        setTypeDishes((prev) => prev.filter((dishes) => dishes !== item));
        setTypeAllergin((prev) => prev.filter((allergin) => allergin !== item));
    };

    return (
        <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
            <DrawerOverlay className={styles.drawer_overlay} />
            <DrawerContent
                zIndex={2100}
                className={styles.drawer_content}
                maxW={{ base: '344px', bp95: '463px' }}
                h='100vh'
                data-test-id={DATA_TEST_ID.FILTER_DRAWER}
            >
                <DrawerHeader
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    px={{ base: 4, bp95: 8 }}
                    pt={{ base: 4, bp95: 8 }}
                    pb={{ base: 8, bp95: 10 }}
                >
                    <Heading as='h2' className={styles.drawer_header}>
                        Фильтр
                    </Heading>
                    <Icon
                        as={CloseDrawer}
                        onClick={onClose}
                        boxSize={6}
                        mr={{ base: 3, bp95: 0 }}
                        data-test-id={DATA_TEST_ID.CLOSE_FILTER_DRAWER}
                    />
                </DrawerHeader>

                <Box
                    as='form'
                    className={styles.form_filter}
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                    display='flex'
                    flexDirection='column'
                    h={{ base: 'calc(100vh - 80px)', bp95: 'calc(100vh - 104px)' }}
                    pr='6px'
                >
                    <Box className={styles.container} flex='1' overflowY='auto'>
                        <DrawerBody
                            className={styles.drawer_body}
                            display='flex'
                            flexDirection='column'
                            gap={{ base: 4, bp95: 6 }}
                            pl={{ base: 4, bp95: 8 }}
                            pr={{ base: '6px', bp95: '18px' }}
                            pt={0}
                            pb={8}
                            h='100%'
                        >
                            <MultiSelect
                                widthMenu='399px'
                                textPlaceHolder='Категория'
                                isDisable={true}
                                listItem={dataCategory}
                                value={categories}
                                onSelectionChange={(selectedCategories) =>
                                    setCategories(selectedCategories)
                                }
                                dataTest={DATA_TEST_ID.FILTER_MENU_BUTTON_CATEGORY}
                            />
                            <MultiSelect
                                widthMenu='399px'
                                textPlaceHolder='Поиск по автору'
                                value={[]}
                                isDisable={true}
                                listItem={dataAuthor}
                                onSelectionChange={(selectedAuthors) => setAuthors(selectedAuthors)}
                            />
                            <ListItemWithCheckBox
                                title='Тип мяса:'
                                selectedTitle={dataTypeMeat}
                                value={typeMeats}
                                onSelectionChange={(selectedMeats) => setTypeMeats(selectedMeats)}
                            />
                            <ListItemWithCheckBox
                                title='Тип гарнира:'
                                selectedTitle={dataGarnish}
                                value={typeDishes}
                                onSelectionChange={(selectedDishes) =>
                                    setTypeDishes(selectedDishes)
                                }
                            />
                            <AllergenSort
                                widthMenu='399px'
                                direction='column'
                                isHiddenMobile
                                value={typeAllergin}
                                dataTestSwitch={DATA_TEST_ID.ALLERGENS_SWITCHER_FILTER}
                                dataTest={DATA_TEST_ID.ALLERGENS_MENU_BUTTON_FILTER}
                                onSelectionChange={(selectedAllergens) =>
                                    setTypeAllergin(selectedAllergens)
                                }
                            />
                            <GreenTags
                                typeAll={typeAll}
                                dataTestId={DATA_TEST_ID.FILTER_TAG}
                                handleRemoveTag={handleRemoveTag}
                            />
                        </DrawerBody>
                    </Box>
                    <DrawerFooter
                        pr={{ base: '16px', bp95: '28px' }}
                        py={{ base: 4, bp95: 8 }}
                        pl={0}
                    >
                        <Button
                            className={styles.button}
                            data-test-id={DATA_TEST_ID.CLEAR_FILTER_BUTTON}
                            size={{ base: 'sm', bp95: 'lg' }}
                            variant='outline'
                            mr={2}
                            type='reset'
                        >
                            Очистить фильтр
                        </Button>
                        <Button
                            className={styles.button}
                            data-test-id={DATA_TEST_ID.FIND_RECIPE_BUTTON}
                            size={{ base: 'sm', bp95: 'lg' }}
                            bg='alpha.900'
                            color='white'
                            px='25px'
                            type='submit'
                            colorScheme='teal'
                            isDisabled={isDisabled}
                            pointerEvents={isDisabled ? 'none' : 'auto'}
                            onClick={onClose}
                        >
                            Найти рецепт
                        </Button>
                    </DrawerFooter>
                </Box>
            </DrawerContent>
        </Drawer>
    );
};
