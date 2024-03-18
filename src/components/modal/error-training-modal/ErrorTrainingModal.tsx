import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import './ErrorTrainingModal.css';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

type TrainingModalProps = {
    isModal: boolean;
    closeModal: () => void;
    update: (value: boolean) => void;
};

export const ErrorTrainingModal: React.FC<TrainingModalProps> = ({
    isModal,
    closeModal,
    update,
}) => {
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen(isModal);
    }, [isModal]);

    const handleOk = () => {
        update(true);
        setIsModalOpen(false);
        closeModal();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        closeModal();
    };

    return (
        <Modal
            className={'modal-error-list-training'}
            maskStyle={{ backgroundColor: 'rgba(121, 156, 212, 0)' }}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            centered={true}
            closeIcon={
                <CloseOutlined
                    className={'close'}
                    data-test-id='modal-error-user-training-button-close'
                />
            }
            style={{ width: '100%', maxWidth: !isMobile ? 384 : 328 }}
        >
            <CloseCircleOutlined className={'icon'} />
            <div className={'wrapper-content'}>
                <h6 className={'title'} data-test-id='modal-error-user-training-title'>
                    При открытии данных <br /> произошла ошибка
                </h6>
                <p className={'text'} data-test-id='modal-error-user-training-subtitle'>
                    Попробуйте ещё раз.
                </p>
            </div>
            <Button
                className={'button-error style'}
                onClick={handleOk}
                type={'primary'}
                data-test-id='modal-error-user-training-button'
            >
                Обновить
            </Button>
        </Modal>
    );
};
