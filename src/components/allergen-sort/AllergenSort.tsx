import { Flex, FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import dataAllergens from '~/data/dataAllergens';
import { getStateSwitchAllergen } from '~/store/selectors/stateSwitchAllergenSelector';
import { setStateSwitch } from '~/store/slice/stateSwitchAllergenSlice';

import MultiSelect from '../multi-select/MultiSelect';
import styles from './AllergenSort.module.css';

type AllergenSortProps = {
    direction?: 'row' | 'column';
    isHiddenMobile?: boolean;
    dataTestSwitch: string;
    dataTest: string;
    value: string[];
    widthMenu?: string;
    onSelectionChange: (selected: string[]) => void;
};

function AllergenSort({
    isHiddenMobile,
    dataTestSwitch,
    dataTest,
    value,
    direction = 'row',
    widthMenu = '234px',
    onSelectionChange,
}: AllergenSortProps) {
    const stateSwitch = useSelector(getStateSwitchAllergen);
    const [isDisable, setDisable] = useState(stateSwitch);
    const dispatch = useDispatch();

    const handleChangeSwitch = (event: ChangeEvent<HTMLInputElement>) => {
        setDisable(event.target.checked);
        dispatch(setStateSwitch(event.target.checked));
    };

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
                    isChecked={stateSwitch}
                    onChange={handleChangeSwitch}
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
                value={value}
                isBottomInput
                dataTest={dataTest}
                onSelectionChange={onSelectionChange}
            />
        </Flex>
    );
}

export default AllergenSort;
