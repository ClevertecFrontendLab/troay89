import { Flex, FormControl, FormLabel, Select, Switch } from '@chakra-ui/react';

import styles from './AllergenSort.module.css';

function AllergenSort() {
    return (
        <Flex className={styles['allergen_container']}>
            <FormControl className={styles['allergen_label']}>
                <FormLabel className={styles['allergen_switch']} htmlFor='allergen-switch'>
                    Исключить мои аллергены
                </FormLabel>
                <Switch id='allergen-switch' colorScheme='red' />
            </FormControl>
            <Select className={styles.select} placeholder='Выберите из списка...'>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
            </Select>
        </Flex>
    );
}

export default AllergenSort;
