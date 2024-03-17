import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Position } from '@pages/training-list/TrainingList.tsx';
import './TrainingModal.css';
import emptyData from '/img/svg/empty-image.svg';
import { PersonalTraining } from '../../../type/Training.ts';
import { TrainingBadge } from '@components/draver/TrainingDraver.tsx';
import { EditOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { editPersonalTraining } from '@redux/reducers/editTrainingSlice.ts';
import { useMediaQuery } from 'react-responsive';

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
    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsModalOpen(isModal);
        if (!isModal && pastFinishTraining) {
            dispatch(editPersonalTraining(null));
        }
        if (!isModalOpen) {
            addDrawer(false);
        }
    }, [addDrawer, dispatch, isModal, isModalOpen, pastFinishTraining]);

    const handleOk = () => {
        addTraining(true);
        setIsModalOpen(false);
        closeModal();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        closeModal();
    };

    const handleEditTraining = (index: number, isFinish: boolean) => {
        if (kindTraining) {
            dispatch(editPersonalTraining(kindTraining[index]));
            if (isFinish) {
                addDrawer(true);
            } else {
                addTraining(true);
                setIsModalOpen(false);
                closeModal();
            }
            setPastFinishTraining(kindTraining[index].isImplementation);
        }
    };

    return (
        <>
            {modalPosition ? (
                <Modal
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
                    {kindTraining && kindTraining.length ? (
                        <ul className='events-modal'>
                            {kindTraining.map((training, index) => (
                                <li key={index} className={'event-edit'}>
                                    <TrainingBadge
                                        className={training.isImplementation ? 'finish' : undefined}
                                        typeTraining={training.name}
                                    />{' '}
                                    <EditOutlined
                                        className={training.isImplementation ? 'finish' : undefined}
                                        onClick={() =>
                                            handleEditTraining(index, training.isImplementation)
                                        }
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
