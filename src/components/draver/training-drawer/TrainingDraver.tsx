import React, { useEffect, useState } from 'react';
import { Badge, Drawer } from 'antd';
import { CloseOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import './TrainingDraver.css';
import { DefaultButton } from '@components/buttons/DefaultButton.tsx';
import { DataTraining } from '../../../type/Training.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { saveListTraining } from '@redux/reducers/listTrainingSlice.ts';
import { editPersonalTraining } from '@redux/reducers/editTrainingSlice.ts';
import { useMediaQuery } from 'react-responsive';
import { saveDrawerTraining } from '@redux/reducers/drawerReduce.ts';
import { TrainingData } from '../../../trainingData/TrainingData.tsx';

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
    const listEditTraining = useAppSelector(
        (state) => state.editPersonalTraining.listPersonalTraining,
    );
    const listDrawer = useAppSelector((state) => state.saveListDrawer.listDrawerTraining);

    useEffect(() => {
        setOpen(isModal);
    }, [isModal]);

    useEffect(() => {
        if (listEditTraining && isCreateTrainingModal) {
            const editTrainingData: DataTraining[] = listEditTraining.exercises.map((item) => {
                return {
                    name: item.name,
                    replays: item.replays,
                    weight: item.weight,
                    approaches: item.approaches,
                };
            });
            dispatch(saveDrawerTraining([...editTrainingData]));
        } else if (!isCreateTrainingModal && !listEditTraining) {
            dispatch(saveListTraining({ date: '', kindTraining: '', data: [] }));
            dispatch(
                saveDrawerTraining([
                    { name: '', replays: undefined, weight: undefined, approaches: undefined },
                ]),
            );
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
                          replays: undefined,
                          weight: undefined,
                          approaches: undefined,
                      },
                  ]),
              );

        closeModal();
        setOpen(false);
    };

    const handleAddTraining = () => {
        dispatch(
            saveDrawerTraining([
                ...listDrawer,
                { name: '', replays: undefined, weight: undefined, approaches: undefined },
            ]),
        );
    };

    const handleDeleteTraining = () => {
        const newTrainingData = listDrawer.filter((_, i) => !isChecked[i]);
        dispatch(saveDrawerTraining([...newTrainingData]));
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
                    {listDrawer.map((_, index) => (
                        <TrainingData
                            index={index}
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
