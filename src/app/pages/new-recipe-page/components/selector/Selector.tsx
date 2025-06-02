import { Select } from '@chakra-ui/react';

import styles from './Selector.module.css';

type SelectorProps = {
    dataMeasurements: string[];
    dataTestId: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
};

export const Selector = ({ dataMeasurements, value, dataTestId, onChange }: SelectorProps) => (
    <Select
        className={styles.selector}
        placeholder='Единица измерен...'
        value={value}
        onChange={onChange}
        w={{ base: '192px', bp76: '215px' }}
        data-test-id={dataTestId}
    >
        {dataMeasurements.map((measurement, index) => (
            <option key={index} value={measurement}>
                {measurement}
            </option>
        ))}
    </Select>
);
