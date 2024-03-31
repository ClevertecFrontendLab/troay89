import React from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { DataTraining, PersonalTraining } from '../type/Training.ts';
import { saveDrawerTraining } from '@redux/reducers/drawerReduce.ts';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Checkbox, Input, InputNumber } from 'antd';
import './TrainingData.css';

type TrainingDataProps = {
    index: number;
    listEditTraining: PersonalTraining | null;
    isChecked: Array<boolean>;
    setIsChecked(value: Array<boolean>): void;
};

export const TrainingData: React.FC<TrainingDataProps> = ({
    index,
    listEditTraining,
    setIsChecked,
    isChecked,
}) => {
    const dispatch = useAppDispatch();
    const listDrawer = useAppSelector((state) => state.saveListDrawer.listDrawerTraining);
    const handleInputChange = (field: keyof DataTraining, value: string | number) => {
        const newTrainingData = [...listDrawer];
        newTrainingData[index] = {
            ...newTrainingData[index],
            [field]: value,
        };
        dispatch(saveDrawerTraining(newTrainingData));
    };

    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        const newIsChecked = [...isChecked];
        newIsChecked[index] = e.target.checked;
        setIsChecked(newIsChecked);
    };

    return (
        <span key={index} className={'wrapper-data-training'}>
            <Input
                type={'text'}
                data-test-id={`modal-drawer-right-input-exercise${index}`}
                size={'small'}
                onChange={(e) => handleInputChange('name', e.currentTarget.value)}
                value={listDrawer[index].name}
                placeholder={'Упражнение'}
                addonAfter={
                    listEditTraining ? (
                        <Checkbox
                            className={'remove-training'}
                            onChange={handleCheckboxChange}
                            checked={isChecked[index]}
                            data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                        />
                    ) : undefined
                }
            />
            <div className={'data-training'}>
                <span className={'wrapper-data'}>
                    <span className={'repeat style'}>Подходы</span>
                    <InputNumber
                        className={'repeat-number'}
                        data-test-id={`modal-drawer-right-input-approach${index}`}
                        min={1}
                        size={'small'}
                        addonBefore='+'
                        value={listDrawer[index].replays}
                        placeholder={'1'}
                        onChange={(value) => handleInputChange('replays', value ?? 1)}
                        controls={false}
                    />
                </span>
                <span className={'wrapper-data'}>
                    <span className={'weight style'}>Вес, кг</span>
                    <InputNumber
                        data-test-id={`modal-drawer-right-input-weight${index}`}
                        min={0}
                        size={'small'}
                        value={listDrawer[index].weight}
                        onChange={(value) => handleInputChange('weight', value ?? 0)}
                        placeholder={'0'}
                        controls={false}
                    />
                </span>
                <span className={'space-x'}>x</span>
                <span className={'wrapper-data'}>
                    <span className={'cont style'}>Количество</span>
                    <InputNumber
                        data-test-id={`modal-drawer-right-input-quantity${index}`}
                        min={1}
                        size={'small'}
                        value={listDrawer[index].approaches}
                        placeholder={'1'}
                        onChange={(value) => handleInputChange('approaches', value ?? 1)}
                        controls={false}
                    />
                </span>
            </div>
        </span>
    );
};
