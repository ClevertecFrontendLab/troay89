import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import './ErrorSaveTrainingModal.css';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

type TrainingModalProps = {
    isModal: boolean;
    closeModal: () => void;
};

export const ErrorSaveTrainingModal: React.FC<TrainingModalProps> = ({ isModal, closeModal }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

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
            style={{ width: '100%', maxWidth: !isMobile ? 384 : 328 }}
            closeIcon={
                <CloseOutlined
                    className={'close'}
                    data-test-id='modal-error-user-training-button-close'
                />
            }
        >
            <CloseCircleOutlined className={'icon'} />
            <div className={'wrapper-content'}>
                <h6 className={'title'} data-test-id='modal-error-user-training-title'>
                    При сохранении данных произошла ошибка
                </h6>
                <p className={'text'} data-test-id='modal-error-user-training-subtitle'>
                    Придётся попробовать ещё раз
                </p>
                <Button
                    className={'button-error style'}
                    data-test-id='modal-error-user-training-button'
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
