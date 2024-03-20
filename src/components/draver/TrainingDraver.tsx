import React, { useEffect, useState } from 'react';
import { Badge, Checkbox, Drawer, Input, InputNumber } from 'antd';
import { CloseOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import './TrainingDraver.css';
import { DefaultButton } from '@components/buttons/DefaultButton.tsx';
import { DataTraining, PersonalTraining } from '../../type/Training.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { saveListTraining } from '@redux/reducers/listTrainingSlice.ts';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { editPersonalTraining } from '@redux/reducers/editTrainingSlice.ts';
import { useMediaQuery } from 'react-responsive';

const BADGE_VALUE = [
    { text: 'Ноги', color: '#FF4D4F' },
    { text: 'Силовая', color: '#FADB14' },
    { text: 'Руки', color: '#13C2C2' },
    { text: 'Грудь', color: '#52C41A' },
    { text: 'Спина', color: '#FA8C16' },
];

type TrainingBadgeProps = {
    typeTraining: string;
    className?: string;
};

type TrainingDataProps = {
    index: number;
    trainingData: DataTraining[];
    setTrainingData(value: DataTraining[]): void;
    listEditTraining: PersonalTraining | null;
    isChecked: Array<boolean>;
    setIsChecked(value: Array<boolean>): void;
};

export const TrainingBadge: React.FC<TrainingBadgeProps> = ({ className, typeTraining }) => {
    const badgeObject = BADGE_VALUE.find((item) => item.text === typeTraining);
    return (
        badgeObject && (
            <Badge
                text={badgeObject.text}
                color={badgeObject.color}
                className={`type-training ${className}`}
            />
        )
    );
};

const TrainingData: React.FC<TrainingDataProps> = ({
    index,
    trainingData,
    setTrainingData,
    listEditTraining,
    setIsChecked,
    isChecked,
}) => {
    const handleInputChange = (field: keyof DataTraining, value: string | number) => {
        const newTrainingData = [...trainingData];
        newTrainingData[index] = {
            ...newTrainingData[index],
            [field]: value,
        };
        setTrainingData(newTrainingData);
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
                value={trainingData[index].name}
                placeholder={'Упражнение'}
                addonAfter={
                    listEditTraining ? (
                        <Checkbox
                            className={'remove-training'}
                            onChange={handleCheckboxChange}
                            checked={isChecked[index]}
                            data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                        />
                    ) : null
                }
            />
            <div className={'data-training'}>
                <span className={'wrapper-data'}>
                    <span className={'repeat style'}>Подходы</span>
                    <InputNumber
                        className={'repeat-number'}
                        data-test-id={`modal-drawer-right-input-approach${index}`}
                        min={1}
                        max={999}
                        size={'small'}
                        addonBefore='+'
                        value={trainingData[index].replays}
                        placeholder={'1'}
                        onChange={(value) => handleInputChange('replays', value ?? 1)}
                    />
                </span>
                <span className={'wrapper-data'}>
                    <span className={'weight style'}>Вес, кг</span>
                    <InputNumber
                        data-test-id={`modal-drawer-right-input-weight${index}`}
                        min={0}
                        max={999}
                        size={'small'}
                        value={trainingData[index].weight}
                        onChange={(value) => handleInputChange('weight', value ?? 0)}
                        placeholder={'0'}
                    />
                </span>
                <span className={'space-x'}>x</span>
                <span className={'wrapper-data'}>
                    <span className={'cont style'}>Количество</span>
                    <InputNumber
                        data-test-id={`modal-drawer-right-input-quantity${index}`}
                        min={1}
                        max={999}
                        size={'small'}
                        value={trainingData[index].approaches}
                        placeholder={'1'}
                        onChange={(value) => handleInputChange('approaches', value ?? 1)}
                    />
                </span>
            </div>
        </span>
    );
};

type TrainingDraverProps = {
    isModal: boolean;
    closeModal: () => void;
    typeTraining: string;
    date: string;
    isCreateTrainingModal: boolean;
};

export const TrainingDraver: React.FC<TrainingDraverProps> = ({
    isModal,
    closeModal,
    typeTraining,
    date,
    isCreateTrainingModal,
}) => {
    const dispatch = useAppDispatch();
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    const [open, setOpen] = useState(false);
    const [isChecked, setIsChecked] = useState<Array<boolean>>([]);
    const [trainingData, setTrainingData] = useState<DataTraining[]>([
        { name: '', replays: undefined, weight: undefined, approaches: undefined },
    ]);
    const listEditTraining = useAppSelector(
        (state) => state.editPersonalTraining.listPersonalTraining,
    );

    useEffect(() => {
        setOpen(isModal);
    }, [isModal]);

    useEffect(() => {
        if (listEditTraining) {
            const editTrainingData: DataTraining[] = listEditTraining.exercises.map((item) => {
                return {
                    name: item.name,
                    replays: item.replays,
                    weight: item.weight,
                    approaches: item.approaches,
                };
            });
            setTrainingData([...editTrainingData]);
        }
        if (!isCreateTrainingModal && !listEditTraining) {
            setTrainingData([
                { name: '', replays: undefined, weight: undefined, approaches: undefined },
            ]);
            dispatch(saveListTraining({ date: '', kindTraining: '', data: [] }));
        }
    }, [dispatch, isCreateTrainingModal, listEditTraining, typeTraining]);

    const onClose = () => {
        const showListTraining: DataTraining[] = trainingData.filter((item) => item.name !== '');
        if (listEditTraining) {
            const updatedListEditTraining = {
                ...listEditTraining,
                exercises: showListTraining.map((item) => ({
                    name: item.name,
                    replays: item.replays || 1,
                    weight: item.weight || 0,
                    approaches: item.approaches || 1,
                    isImplementation: false,
                })),
            };
            dispatch(editPersonalTraining(updatedListEditTraining));
        } else {
            dispatch(
                saveListTraining({
                    date: date,
                    kindTraining: typeTraining,
                    data: showListTraining,
                }),
            );
        }
        showListTraining.length > 0
            ? setTrainingData([...showListTraining])
            : setTrainingData([
                  {
                      name: '',
                      replays: undefined,
                      weight: undefined,
                      approaches: undefined,
                  },
              ]);

        closeModal();
        setOpen(false);
    };

    const handleAddTraining = () => {
        setTrainingData([
            ...trainingData,
            { name: '', replays: undefined, weight: undefined, approaches: undefined },
        ]);
    };

    const handleDeleteTraining = () => {
        const newTrainingData = trainingData.filter((_, i) => !isChecked[i]);
        setTrainingData(newTrainingData);
        setIsChecked([]);
    };

    return (
        <div className='site-drawer-render-in-current-wrapper'>
            <Drawer
                data-test-id='modal-drawer-right'
                className={'add-training-drawer'}
                title={
                    listEditTraining ? (
                        <>
                            <EditOutlined className={'edit'} /> {'Редактирование'}
                        </>
                    ) : (
                        <>
                            <PlusOutlined className={'plus'} /> {'Добавление упражнений'}
                        </>
                    )
                }
                placement={!isMobile ? 'right' : 'bottom'}
                closable={true}
                onClose={onClose}
                open={open}
                getContainer={false}
                style={{ position: 'absolute' }}
                mask={false}
                maskClosable={false}
                width={!isMobile ? 408 : '100%'}
                height={!isMobile ? undefined : 555}
                closeIcon={
                    <div
                        style={{
                            position: 'absolute',
                            right: !isMobile ? 33 : 17,
                            top: 31,
                            fontSize: 13,
                        }}
                    >
                        <CloseOutlined data-test-id='modal-drawer-right-button-close' />
                    </div>
                }
            >
                <span className={'wrapper-info'}>
                    <TrainingBadge typeTraining={typeTraining} />
                    <span className={'date'}>{date}</span>
                </span>
                <div className={'wrapper-training'}>
                    {trainingData.map((_, index) => (
                        <TrainingData
                            index={index}
                            setTrainingData={setTrainingData}
                            trainingData={trainingData}
                            key={index}
                            listEditTraining={listEditTraining}
                            setIsChecked={setIsChecked}
                            isChecked={isChecked}
                        />
                    ))}
                </div>
                <div className={'wrapper-button'}>
                    <DefaultButton
                        icon={<PlusOutlined />}
                        text={'Добавить ещё'}
                        className={`button-add-training ${listEditTraining ? 'edit' : null}`}
                        onClick={handleAddTraining}
                    />
                    {listEditTraining && (
                        <DefaultButton
                            icon={<MinusOutlined />}
                            text={'Удалить'}
                            className={'button-add-training edit'}
                            onClick={handleDeleteTraining}
                            disabled={!isChecked.length}
                        />
                    )}
                </div>
            </Drawer>
        </div>
    );
};
