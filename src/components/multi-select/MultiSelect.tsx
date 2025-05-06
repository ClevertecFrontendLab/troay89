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
    MenuList,
    Stack,
    Text,
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';

import GreenPlus from '../icons/GreenPlus';
import styles from './MultiSelect.module.css';

type MultiSelectProps = {
    widthMenu: string;
    textPlaceHolder: string;
    value: string[];
    listItem: string[];
    isDisable: boolean;
    isBottomInput?: boolean;
    dataTest?: string;
    onSelectionChange: (selected: string[]) => void;
};

function MultiSelect({
    widthMenu,
    textPlaceHolder,
    isDisable,
    listItem,
    value,
    isBottomInput,
    onSelectionChange,
    dataTest,
}: MultiSelectProps) {
    const [customAllergen, setCustomAllergen] = useState('');

    const getSelectedLabel = () => {
        if (!value.length || !isDisable) {
            return textPlaceHolder;
        }
        return value;
    };

    useEffect(() => {
        if (!isDisable) {
            onSelectionChange([]);
        }
    }, [isDisable]);

    const toggleOption = (option: string) => {
        if (value.includes(option)) {
            onSelectionChange(value.filter((item) => item !== option));
        } else {
            onSelectionChange([...value, option]);
        }
    };

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setCustomAllergen(event.target.value);
    };

    const handleClickPlus = () => {
        const allergenToAdd = customAllergen.trim();
        if (allergenToAdd && !value.includes(allergenToAdd)) {
            toggleOption(allergenToAdd);
        }
        setCustomAllergen('');
    };

    const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleClickPlus();
        }
    };

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
                        isDisabled={!isDisable}
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'white' }}
                        data-test-id={dataTest}
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
                    <MenuList
                        className={styles.menu_list}
                        zIndex={10}
                        py={0}
                        width={{ base: '308px', bp95: widthMenu }}
                        data-test-id='allergens-menu'
                    >
                        {listItem.map((allergen, index) => (
                            <Stack
                                className={styles.menu_item}
                                key={allergen}
                                onClick={() => toggleOption(allergen)}
                                display='flex'
                                alignItems='center'
                                direction='row'
                                px='16px'
                                py='6px'
                                data-test-id={
                                    textPlaceHolder.startsWith('Выберите из спи')
                                        ? isDisable
                                            ? `allergen-${index}`
                                            : ''
                                        : `checkbox-${allergen.toLocaleLowerCase()}`
                                }
                            >
                                <Checkbox
                                    className={styles.checkbox}
                                    size='sm'
                                    isChecked={value.includes(allergen)}
                                    mr={2}
                                    ml={1}
                                    pointerEvents='none'
                                    borderColor='lime.400'
                                />
                                <Text>{allergen}</Text>
                            </Stack>
                        ))}
                        {isBottomInput && (
                            <Flex align='center' ml={6} mt={2} mb={3}>
                                <Input
                                    size='sm'
                                    placeholder='Другой аллерген'
                                    value={customAllergen}
                                    onChange={handleChangeInput}
                                    onKeyDown={handleEnterKeyPress}
                                    data-test-id={isDisable ? 'add-other-allergen' : ''}
                                />
                                <Button
                                    variant='ghost'
                                    mr='10px'
                                    ml='6px'
                                    size='xs'
                                    py={0}
                                    _hover={{ bg: 'transparent' }}
                                >
                                    <Icon
                                        as={GreenPlus}
                                        boxSize={3}
                                        onClick={handleClickPlus}
                                        data-test-id={isDisable ? 'add-allergen-button' : ''}
                                    />
                                </Button>
                            </Flex>
                        )}
                    </MenuList>
                </>
            )}
        </Menu>
    );
}

export default MultiSelect;
