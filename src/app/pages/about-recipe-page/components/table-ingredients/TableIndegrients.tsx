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

import styles from './TableIndegrients.module.css';

const ingredients = [
    { title: 'зелёного лука', count: '1', measureUnit: 'пучок' },
    { title: 'репчатого лука', count: '1', measureUnit: 'шт' },
    { title: 'чеснока', count: '1', measureUnit: 'зубчик' },
    { title: 'куриного филе', count: '500', measureUnit: 'г' },
    { title: 'масла или жира', count: '40', measureUnit: 'г' },
    { title: 'спагетти', count: '250', measureUnit: 'г' },
    { title: 'молотого шафрана', count: '1', measureUnit: 'щепотка' },
    { title: 'молотой корицы', count: '1', measureUnit: 'щепотка' },
    { title: 'муки', count: '1', measureUnit: 'ст л' },
    { title: 'сливок', count: '250', measureUnit: 'мл' },
    { title: 'куриного бульона из кубика', count: '200', measureUnit: 'мл' },
    { title: 'нарезанной петрушки', count: '2', measureUnit: 'ст л' },
];

function TableIngredients() {
    const [countPortion, setCountPortion] = useState(4);
    const [arrayIngredients, setArrayIngredients] = useState(ingredients);
    const handleChangePortion = (event: ChangeEvent<HTMLInputElement>) =>
        setCountPortion(+event.target.value);
    const handleChangeClickUp = () => setCountPortion((value) => value + 1);
    const handleChangeClickDown = () => setCountPortion((value) => (value > 1 ? value - 1 : value));

    useEffect(() => {
        setArrayIngredients(
            ingredients.map(({ title, count, measureUnit }) => ({
                title,
                count: (+count / 4) * countPortion + '',
                measureUnit,
            })),
        );
    }, [countPortion]);

    return (
        <TableContainer className={styles.table_container} maxW='668px' mx='auto' mb={10}>
            <Table variant='striped' colorScheme='alpha'>
                <Thead>
                    <Tr>
                        <Th className={styles.table_thead}>ИНГРЕДИЕНТЫ</Th>
                        <Th className={styles.table_thead} pr={0}>
                            <Flex align='center' justify='flex-end'>
                                <FormLabel className={styles.form_label} m={0}>
                                    ПОРЦИЙ
                                    <Input
                                        className={styles.input_portion}
                                        type='number'
                                        ml={4}
                                        min={1}
                                        value={countPortion}
                                        onChange={handleChangePortion}
                                    />
                                    <Button
                                        className={styles.button_up}
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
                    {arrayIngredients.map(({ title, count, measureUnit }) => (
                        <Tr border='none' key={title}>
                            <Td className={styles.table_description}>{title}</Td>
                            <Td
                                className={styles.table_description}
                                textAlign='right'
                            >{`${count} ${measureUnit}`}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default TableIngredients;
