import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Icon,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import dataAllergens from '~/data/dataAllergens';
import { setResultFilter } from '~/store/slice/arrayResultFilterSlice';

import GreenPlus from '../icons/GreenPlus';
import styles from './MultiSelect.module.css';

type MultiSelectProps = {
    isDisable: boolean;
};

function MultiSelect({ isDisable }: MultiSelectProps) {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState<string[]>([]);
    const [customAllergen, setCustomAllergen] = useState('');

    const toggleOption = (value: string) => {
        setSelected((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
        );
    };

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setCustomAllergen(event.target.value);
    };

    const handleClickPlus = () => {
        const allergenToAdd = customAllergen.trim();
        if (allergenToAdd && !selected.includes(allergenToAdd)) {
            toggleOption(allergenToAdd);
        }
        setCustomAllergen('');
    };

    const getSelectedLabel = () => {
        if (!selected.length || !isDisable) {
            return 'Выберите из списка...';
        }
        return selected;
    };

    useEffect(() => {
        dispatch(setResultFilter(selected));
    }, [dispatch, selected]);

    useEffect(() => {
        if (!isDisable) {
            setSelected([]);
        }
    }, [isDisable]);

    const selectedLabel = getSelectedLabel();

    return (
        <Menu closeOnSelect={false}>
            {({ isOpen }) => (
                <>
                    <MenuButton
                        as={Button}
                        className={styles.select}
                        pr={2}
                        variant='outline'
                        disabled={!isDisable}
                        pointerEvents={!isDisable ? 'none' : 'auto'}
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'white' }}
                        rightIcon={
                            isOpen ? <ChevronUpIcon boxSize={6} /> : <ChevronDownIcon boxSize={6} />
                        }
                    >
                        <Flex
                            className={
                                typeof selectedLabel !== 'string' ? styles.container_label : ''
                            }
                            flexWrap='wrap'
                            gap={2}
                        >
                            {Array.isArray(selectedLabel)
                                ? selectedLabel.map((label) => (
                                      <Box key={label} className={styles.label_allergen}>
                                          {label}
                                      </Box>
                                  ))
                                : selectedLabel}
                        </Flex>
                    </MenuButton>
                    <MenuList className={styles.menu_list} zIndex={10} py={0} width='234px'>
                        {dataAllergens.map((allergen) => (
                            <MenuItem
                                className={styles.menu_item}
                                key={allergen}
                                onClick={() => toggleOption(allergen)}
                                display='flex'
                                alignItems='center'
                            >
                                <Checkbox
                                    className={styles.checkbox}
                                    size='sm'
                                    isChecked={selected.includes(allergen)}
                                    mr={2}
                                    ml={1}
                                    pointerEvents='none'
                                    borderColor='lime.400'
                                />
                                <Text>{allergen}</Text>
                            </MenuItem>
                        ))}
                        <Flex align='center' ml={6} mt={2} mb={3}>
                            <Input
                                size='sm'
                                placeholder='Другой аллерген'
                                value={customAllergen}
                                onChange={handleChangeInput}
                            />
                            <Button
                                variant='ghost'
                                mr='10px'
                                ml='6px'
                                size='xs'
                                py={0}
                                _hover={{ bg: 'transparent' }}
                            >
                                <Icon as={GreenPlus} boxSize={3} onClick={handleClickPlus} />
                            </Button>
                        </Flex>
                    </MenuList>
                </>
            )}
        </Menu>
    );
}

export default MultiSelect;
