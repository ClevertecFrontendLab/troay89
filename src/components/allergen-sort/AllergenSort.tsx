import { Flex, FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { useState } from 'react';

import MultiSelect from '../multi-select/MultiSelect';
import styles from './AllergenSort.module.css';

function AllergenSort() {
    const [isDisable, setDisable] = useState(false);

    return (
        <Flex className={styles.allergen_container}>
            <FormControl className={styles.allergen_label}>
                <FormLabel className={styles.allergen_switch} htmlFor='allergen-switch'>
                    Исключить мои аллергены
                </FormLabel>
                <Switch
                    className={styles.switch}
                    id='allergen-switch'
                    onChange={(event) => setDisable(event.target.checked)}
                />
            </FormControl>
            <MultiSelect isDisable={isDisable} />
        </Flex>
    );
}

export default AllergenSort;
