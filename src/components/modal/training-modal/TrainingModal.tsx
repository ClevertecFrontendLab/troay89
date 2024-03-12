import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Position } from '@pages/training-list/TrainingList.tsx';
import './TrainingModal.css';
import emptyData from '/img/svg/empty-image.svg';

type TrainingModalProps = {
    isModal: boolean;
    modalPosition: Position | null;
    closeModal: () => void;
    addTraining: (value: boolean) => void;
};

export const TrainingModal: React.FC<TrainingModalProps> = ({
    isModal,
    closeModal,
    modalPosition,
    addTraining,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
    // : { left: modalPosition.left - 460 }),

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
                        disabled: modalPosition.disabled,
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
                    <p className={'text'}>Нет активных тренировок</p>
                    <img className={'img-not-data'} src={emptyData} alt={'not data'} />
                </Modal>
            ) : null}
        </>
    );
};
