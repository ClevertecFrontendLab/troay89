import React, { ChangeEvent, useEffect, useState } from 'react';
import { Badge, Checkbox, Drawer, Input, InputNumber } from 'antd';
import { CloseOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import './TrainingDraver.css';
import { DefaultButton } from '@components/buttons/DefaultButton.tsx';
import { DataTraining } from '../../type/Training.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { saveListTraining } from '@redux/reducers/listTrainingSlice.ts';
import { editPersonalTraining } from '@redux/reducers/editTrainingSlice.ts';
import { useMediaQuery } from 'react-responsive';
import {
    addExercises,
    deleteExercises,
    saveDrawerTraining,
    saveDrawerTrainingField,
} from '@redux/reducers/drawerReduce.ts';

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

type Nullable<T> = T | null;

type TrainingDataProps = {
    index: number;
    indexes: number[];
    weight: number;
    approaches: number;
    name: string;
    replays: number;
    isCheck: boolean;
    onChangeName: (value: string, index: number) => void;
    onChangeReplays: (value: Nullable<number>, index: number) => void;
    onChangeWeight: (value: Nullable<number>, index: number) => void;
    onChangeApproaches: (value: Nullable<number>, index: number) => void;
    onCheckedElement: (index: number) => void;
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
    onChangeReplays,
    onChangeApproaches,
    onChangeWeight,
    onChangeName,
    onCheckedElement,
    weight,
    replays,
    name,
    approaches,
    index,
    indexes,
    isCheck,
}) => {
    const isChecked = indexes.includes(index);

    const onChangeNameHandle = (event: ChangeEvent<HTMLInputElement>) => {
        onChangeName(event.currentTarget.value, index);
    };

    const onChangeApproachesHandle = (value: Nullable<number>) => {
        onChangeApproaches(value, index);
    };

    const onChangeReplaysHandle = (value: Nullable<number>) => {
        onChangeReplays(value, index);
    };

    const onChangeWeightHandle = (value: Nullable<number>) => {
        onChangeWeight(value, index);
    };

    return (
        <span key={index} className={'wrapper-data-training'}>
            <Input
                type={'text'}
                data-test-id={`modal-drawer-right-input-exercise${index}`}
                size={'small'}
                onChange={onChangeNameHandle}
                value={name}
                placeholder={'Упражнение'}
                addonAfter={
                    isCheck && (
                        <Checkbox
                            className={'remove-training'}
                            onChange={() => onCheckedElement(index)}
                            checked={isChecked}
                            data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                        />
                    )
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
                        value={replays}
                        placeholder={'1'}
                        onChange={onChangeReplaysHandle}
                        controls={false}
                    />
                </span>
                <span className={'wrapper-data'}>
                    <span className={'weight style'}>Вес, кг</span>
                    <InputNumber
                        data-test-id={`modal-drawer-right-input-weight${index}`}
                        min={0}
                        size={'small'}
                        value={weight}
                        onChange={onChangeWeightHandle}
                        placeholder={'0'}
                        controls={false}
                    />
                </span>
                <span className={'space-x'}>x</span>
                <span className={'wrapper-data'}>
                    <span className={'cont style'}>Количество</span>
                    <InputNumber
                        data-test-id={`modal-drawer-right-input-quantity${index}`}
                        min={0}
                        size={'small'}
                        value={approaches}
                        placeholder={'1'}
                        onChange={onChangeApproachesHandle}
                        controls={false}
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
    const [indexes, setIndexes] = useState<number[]>([]);
    const listEditTraining = useAppSelector(
        (state) => state.editPersonalTraining.listPersonalTraining,
    );
    const listDrawer = useAppSelector((state) => state.saveListDrawer.listDrawerTraining);

    useEffect(() => {
        setOpen(isModal);
    }, [isModal]);

    useEffect(() => {
        if (listEditTraining) {
            console.log('I an here 2');
            const editTrainingData: DataTraining[] = listEditTraining.exercises.map((item) => {
                return {
                    name: item.name,
                    replays: item.replays,
                    weight: item.weight,
                    approaches: item.approaches,
                };
            });
            dispatch(saveDrawerTraining([...editTrainingData]));
        }
        if (!isCreateTrainingModal && !listEditTraining) {
            // dispatch(saveDrawerTraining([{ name: '', replays: 0, weight: 0, approaches: 0 }]));
            dispatch(saveListTraining({ date: '', kindTraining: '', data: [] }));
        }
    }, [dispatch, isCreateTrainingModal, listEditTraining]);

    const onClose = () => {
        const showListTraining: DataTraining[] = listDrawer.filter((item) => item.name !== '');
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
            ? dispatch(saveDrawerTraining([...showListTraining]))
            : dispatch(
                  saveDrawerTraining([
                      {
                          name: '',
                          replays: 0,
                          weight: 0,
                          approaches: 0,
                      },
                  ]),
              );

        closeModal();
        setOpen(false);
    };

    const addExercisesDataHandle = () => {
        dispatch(addExercises());
    };

    const deleteExercisesDataHandle = () => {
        dispatch(deleteExercises(indexes));
        setIndexes([]);
    };

    const onChangeApproaches = (value: Nullable<number>, index: number) => {
        dispatch(saveDrawerTrainingField({ approaches: value || 0, index }));
    };

    const onChangeName = (value: Nullable<string>, index: number) => {
        dispatch(saveDrawerTrainingField({ name: value || '', index }));
    };

    const onChangeReplays = (value: Nullable<number>, index: number) => {
        dispatch(saveDrawerTrainingField({ replays: value || 0, index }));
    };

    const onChangeWeight = (value: Nullable<number>, index: number) => {
        dispatch(saveDrawerTrainingField({ weight: value || 0, index }));
    };

    const onSetIndex = (index: number) => {
        if (indexes.includes(index)) {
            setIndexes(indexes.filter((element) => element !== index));

            return;
        }

        setIndexes([...indexes, index]);
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
                    {listDrawer.map(({ weight, approaches, name, replays }, index) => (
                        <TrainingData
                            key={index}
                            weight={weight}
                            approaches={approaches}
                            name={name}
                            replays={replays}
                            onChangeApproaches={onChangeApproaches}
                            onChangeName={onChangeName}
                            onChangeReplays={onChangeReplays}
                            onChangeWeight={onChangeWeight}
                            index={index}
                            indexes={indexes}
                            onCheckedElement={onSetIndex}
                            isCheck={!!listEditTraining}
                        />
                    ))}
                </div>
                <div className={'wrapper-button'}>
                    <DefaultButton
                        icon={<PlusOutlined />}
                        text={'Добавить ещё'}
                        className={`button-add-training ${listEditTraining ? 'edit' : null}`}
                        onClick={addExercisesDataHandle}
                    />
                    {listEditTraining && (
                        <DefaultButton
                            icon={<MinusOutlined />}
                            text={'Удалить'}
                            className={'button-add-training edit'}
                            onClick={deleteExercisesDataHandle}
                            disabled={!indexes.length}
                        />
                    )}
                </div>
            </Drawer>
        </div>
    );
};
