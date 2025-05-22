import { Flex, FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { dataAllergens } from '~/data/dataAllergens';
import { getStateSwitchAllergen } from '~/store/selectors/stateSwitchAllergenSelector';
import { setStateSwitch } from '~/store/slice/stateSwitchAllergenSlice';

import { MultiSelect } from '../multi-select/MultiSelect';
import styles from './AllergenSort.module.css';

type AllergenSortProps = {
    dataTestSwitch: string;
    dataTest: string;
    value: string[];
    isHiddenMobile?: boolean;
    onSelectionChange: (selected: string[]) => void;
    direction?: 'row' | 'column';
    widthMenu?: string;
};

export const AllergenSort = ({
    isHiddenMobile,
    dataTestSwitch,
    dataTest,
    value,
    direction = 'row',
    widthMenu = '234px',
    onSelectionChange,
}: AllergenSortProps) => {
    const dispatch = useDispatch();
    const stateSwitch = useSelector(getStateSwitchAllergen);
    const [isDisable, setIsDisable] = useState(stateSwitch);

    const handleChangeSwitch = (event: ChangeEvent<HTMLInputElement>) => {
        setIsDisable(event.target.checked);
        dispatch(setStateSwitch(event.target.checked));
    };

    const textPlaceHolder =
        direction === 'row' ? 'Выберите из списка...' : 'Выберите из списка аллергенов...';

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
                textPlaceHolder={textPlaceHolder}
                isDisable={isDisable}
                listItem={dataAllergens}
                value={value}
                isBottomInput
                dataTest={dataTest}
                onSelectionChange={onSelectionChange}
            />
        </Flex>
    );
};
