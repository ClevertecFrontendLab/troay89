import { Flex, FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { useState } from 'react';

import dataAllergens from '~/data/dataAllergens';

import MultiSelect from '../multi-select/MultiSelect';
import styles from './AllergenSort.module.css';

type AllergenSortProps = {
    direction?: 'row' | 'column';
    isHiddenMobile?: boolean;
    dataTestSwitch: string;
    dataTest: string;
    widthMenu?: string;
};

function AllergenSort({
    isHiddenMobile,
    dataTestSwitch,
    dataTest,
    direction = 'row',
    widthMenu = '234px',
}: AllergenSortProps) {
    const [isDisable, setDisable] = useState(false);

    return (
        <Flex
            className={styles.allergen_container}
            direction={direction}
            display={{ base: isHiddenMobile ? 'flex' : 'none', bp115: 'flex' }}
        >
            <FormControl className={styles.allergen_label} mt={direction === 'row' ? '8px' : '6px'}>
                <FormLabel className={styles.allergen_switch} htmlFor='allergen-switch'>
                    Исключить мои аллергены
                </FormLabel>
                <Switch
                    data-test-id={dataTestSwitch}
                    className={styles.switch}
                    id='allergen-switch'
                    onChange={(event) => setDisable(event.target.checked)}
                />
            </FormControl>
            <MultiSelect
                widthMenu={widthMenu}
                textPlaceHolder={
                    direction === 'row'
                        ? 'Выберите из списка...'
                        : 'Выберите из списка аллергенов...'
                }
                isDisable={isDisable}
                listItem={dataAllergens}
                isBottomInput
                immediate
                dataTest={dataTest}
            />
        </Flex>
    );
}

export default AllergenSort;
