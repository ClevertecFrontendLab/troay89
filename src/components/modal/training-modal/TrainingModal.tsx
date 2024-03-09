import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Position } from '@pages/training-list/TrainingList.tsx';
import './TrainingModal.css';
import emptyData from '/img/svg/empty-image.svg';

type TrainingModalProps = {
    isModal: boolean;
    modalPosition: Position | null;
    closeModal: () => void;
};

export const TrainingModal: React.FC<TrainingModalProps> = ({
    isModal,
    closeModal,
    modalPosition,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen(isModal);
    }, [isModal]);

    const handleOk = () => {
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
                    className={'modal-list-training'}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okButtonProps={{
                        className: 'style-second',
                        size: 'large',
                    }}
                    okText='Создать тренировку'
                    cancelButtonProps={{ style: { display: 'none' } }}
                    style={{
                        top: modalPosition.top,
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
