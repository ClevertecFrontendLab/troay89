import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import './ErrorSaveTrainingModal.css';
import { CloseCircleOutlined } from '@ant-design/icons';

type TrainingModalProps = {
    isModal: boolean;
    closeModal: () => void;
};

export const ErrorSaveTrainingModal: React.FC<TrainingModalProps> = ({ isModal, closeModal }) => {
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
        <Modal
            className={'modal-error-save-training'}
            maskStyle={{ backgroundColor: 'rgba(121, 156, 212, 0)' }}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            centered={true}
            style={{ width: '100%', maxWidth: 384 }}
        >
            <CloseCircleOutlined className={'icon'} />
            <div className={'wrapper-content'}>
                <h6 className={'title'}>При сохранении данных произошла ошибка</h6>
                <p className={'text'}>Придётся попробовать ещё раз</p>
                <Button
                    className={'button-error style'}
                    onClick={handleOk}
                    type={'primary'}
                    size={'large'}
                >
                    Закрыть
                </Button>
            </div>
        </Modal>
    );
};
