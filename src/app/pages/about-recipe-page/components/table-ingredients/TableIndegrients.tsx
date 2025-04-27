import {
    Button,
    Flex,
    FormLabel,
    Icon,
    Input,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';

import UpDown from '~/components/icons/UpDown';
import { useNavigationIndices } from '~/hooks/useNavigationIndices';

import styles from './TableIndegrients.module.css';

function TableIngredients() {
    const { recipe } = useNavigationIndices();

    const [countPortion, setCountPortion] = useState(1);
    const [originalPortions, setOriginalPortions] = useState(recipe?.portions || 1);
    const [arrayIngredients, setArrayIngredients] = useState(recipe?.ingredients);
    const handleChangePortion = (event: ChangeEvent<HTMLInputElement>) =>
        setCountPortion(+event.target.value);
    const handleChangeClickUp = () => setCountPortion((value) => value + 1);
    const handleChangeClickDown = () => setCountPortion((value) => (value > 1 ? value - 1 : value));

    useEffect(() => {
        if (recipe !== undefined) {
            setCountPortion(recipe.portions);
            setOriginalPortions(recipe.portions);
        }
    }, [recipe]);

    useEffect(() => {
        if (recipe !== undefined) {
            setArrayIngredients(
                recipe.ingredients.map(({ title, count, measureUnit }) => ({
                    title,
                    count: ((+count / originalPortions) * countPortion).toString(),
                    measureUnit,
                })),
            );
        }
    }, [countPortion, originalPortions, recipe]);

    return (
        <TableContainer
            className={styles.table_container}
            maxW={{ base: '604px', bp95: '578px', bp160: '668px' }}
            mx='auto'
            mb={{ base: 6, bp95: 10 }}
        >
            <Table variant='striped' colorScheme='alpha' style={{ tableLayout: 'fixed' }}>
                <Thead>
                    <Tr>
                        <Th className={styles.table_thead} px={{ base: 2, bp76: 6 }}>
                            ИНГРЕДИЕНТЫ
                        </Th>
                        <Th className={styles.table_thead} px={0}>
                            <Flex align='center' justify='flex-end'>
                                <FormLabel className={styles.form_label} m={0}>
                                    ПОРЦИЙ
                                    <Input
                                        className={styles.input_portion}
                                        type='number'
                                        ml={{ base: 3, bp76: 4 }}
                                        min={1}
                                        value={countPortion}
                                        onChange={handleChangePortion}
                                    />
                                    <Button
                                        className={styles.button_up}
                                        data-test-id='increment-stepper'
                                        p={0}
                                        minW='auto'
                                        variant='outline'
                                        w='24px'
                                        h='20px'
                                    >
                                        <Icon
                                            as={UpDown}
                                            boxSize={3}
                                            onClick={handleChangeClickUp}
                                        />
                                    </Button>
                                    <Button
                                        className={styles.button_down}
                                        data-test-id='decrement-stepper'
                                        p={0}
                                        minW='auto'
                                        variant='outline'
                                        w='24px'
                                        h='20px'
                                    >
                                        <Icon
                                            as={UpDown}
                                            boxSize={3}
                                            onClick={handleChangeClickDown}
                                        />
                                    </Button>
                                </FormLabel>
                            </Flex>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {arrayIngredients &&
                        arrayIngredients.map(({ title, count, measureUnit }, index) => (
                            <Tr border='none' key={title}>
                                <Td
                                    className={styles.table_description}
                                    pl={{ base: 2, bp76: 6 }}
                                    pr={{ base: 0, bp76: 6 }}
                                >
                                    {title}
                                </Td>
                                <Td
                                    pl={{ base: 0, bp76: 6 }}
                                    pr={{ base: 3, bp76: 6 }}
                                    className={styles.table_count}
                                    textAlign='right'
                                    data-test-id={`ingredient-quantity-${index}`}
                                >{`${count} ${measureUnit}`}</Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default TableIngredients;
