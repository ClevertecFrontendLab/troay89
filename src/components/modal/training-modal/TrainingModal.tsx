import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import './TrainingModal.css';
import emptyData from '/img/svg/empty-image.svg';
import { PersonalTraining } from '../../../type/Training.ts';
import { TrainingBadge } from '@components/draver/TrainingDraver.tsx';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { editPersonalTraining } from '@redux/reducers/editTrainingSlice.ts';
import { useMediaQuery } from 'react-responsive';
import { Position } from '@pages/calendar/CustomCalendar.tsx';
import { saveDrawerTraining } from '@redux/reducers/drawerReduce.ts';

type TrainingModalProps = {
    isModal: boolean;
    modalPosition: Position | null;
    closeModal: () => void;
    addTraining: (value: boolean) => void;
    addDrawer: (value: boolean) => void;
    kindTraining: PersonalTraining[] | undefined;
};

export const TrainingModal: React.FC<TrainingModalProps> = ({
    isModal,
    closeModal,
    modalPosition,
    addTraining,
    kindTraining,
    addDrawer,
}) => {
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pastFinishTraining, setPastFinishTraining] = useState(false);
    const [listKindTraining, setListKindTraining] = useState<PersonalTraining[] | undefined>(
        undefined,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsModalOpen(isModal);
        if (!isModal && pastFinishTraining) {
            dispatch(editPersonalTraining(null));
        } else if (!isModal) {
            dispatch(
                saveDrawerTraining([
                    { name: '', replays: undefined, weight: undefined, approaches: undefined },
                ]),
            );
        }
        if (isModalOpen) {
            setListKindTraining(kindTraining);
        } else if (!isModalOpen) {
            setListKindTraining(undefined);
            addDrawer(false);
        }
    }, [addDrawer, dispatch, isModal, isModalOpen, kindTraining, pastFinishTraining]);

    const handleEditTraining = (index: number) => {
        if (kindTraining) {
            dispatch(editPersonalTraining(kindTraining[index]));
            addTraining(true);
            setPastFinishTraining(kindTraining[index].isImplementation);
            setListKindTraining(() => {
                return undefined;
            });
            setTimeout(() => {
                closeModal();
            }, 0);
            setIsModalOpen(false);
        }
    };

    const handleOk = () => {
        addTraining(true);
        setIsModalOpen(false);
        closeModal();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        closeModal();
    };

    return (
        <>
            {modalPosition ? (
                <Modal
                    data-test-id={'modal-create-training'}
                    getContainer={'.ant-picker-cell'}
                    className={'modal-list-training'}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okButtonProps={{
                        className: 'style-second',
                        size: 'large',
                        disabled:
                            modalPosition.disabled || (kindTraining && kindTraining.length === 5),
                    }}
                    closeIcon={
                        <CloseOutlined
                            className={'close'}
                            data-test-id='modal-create-training-button-close'
                        />
                    }
                    okText='Создать тренировку'
                    cancelButtonProps={{ style: { display: 'none' } }}
                    style={{
                        top: modalPosition.top - 167,
                        ...(modalPosition.right !== undefined
                            ? { left: modalPosition.right - 264 }
                            : { left: modalPosition.left }),
                        maxWidth: !isMobile ? 264 : 312,
                    }}
                    mask={false}
                >
                    <h1 className={'title'}>
                        Тренировки на <span className={'title-data'}>{modalPosition.date}</span>
                    </h1>
                    {listKindTraining && listKindTraining.length ? (
                        <ul className='events-modal'>
                            {listKindTraining.map((training, index) => (
                                <li key={index} className={'event-edit'}>
                                    <TrainingBadge
                                        className={training.isImplementation ? 'finish' : undefined}
                                        typeTraining={training.name}
                                    />{' '}
                                    <Button
                                        data-test-id={`modal-update-training-edit-button${index}`}
                                        className={'edit-training-button'}
                                        icon={
                                            <EditOutlined
                                                className={
                                                    training.isImplementation ? 'finish' : undefined
                                                }
                                            />
                                        }
                                        onClick={() => handleEditTraining(index)}
                                        disabled={training.isImplementation}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <>
                            <p className={'text'}>Нет активных тренировок</p>
                            <img className={'img-not-data'} src={emptyData} alt={'not data'} />
                        </>
                    )}
                </Modal>
            ) : null}
        </>
    );
};
