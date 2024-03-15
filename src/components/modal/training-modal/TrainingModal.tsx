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

type TrainingModalProps = {
    isModal: boolean;
    modalPosition: Position | null;
    closeModal: () => void;
    addTraining: (value: boolean) => void;
    kindTraining: PersonalTraining[] | undefined;
};

export const TrainingModal: React.FC<TrainingModalProps> = ({
    isModal,
    closeModal,
    modalPosition,
    addTraining,
    kindTraining,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsModalOpen(isModal);
    }, [isModal]);

    const handleOk = () => {
        addTraining(true);
        setIsModalOpen(false);
        closeModal();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        closeModal();
    };

    const handleEditTraining = (index: number) => {
        if (kindTraining) {
            dispatch(editPersonalTraining(kindTraining[index]));
            setIsModalOpen(false);
            closeModal();
            addTraining(true);
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
                        maxWidth: 264,
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
                                    <TrainingBadge typeTraining={training.name} />{' '}
                                    <EditOutlined onClick={() => handleEditTraining(index)} />
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
