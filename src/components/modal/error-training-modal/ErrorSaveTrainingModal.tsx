import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import './ErrorSaveTrainingModal.css';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

type TrainingModalProps = {
    isModal: boolean;
    closeModal: () => void;
    tittle: string;
    text: string;
    className?: string;
    dataTestId?: string;
};

export const ErrorSaveTrainingModal: React.FC<TrainingModalProps> = ({
    isModal,
    closeModal,
    tittle,
    text,
    className,
    dataTestId,
}) => {
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
            className={`modal-error-save-training ${className && className}`}
            maskStyle={{ backgroundColor: 'rgba(121, 156, 212, 0)' }}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            centered={true}
            style={{ width: '100%', maxWidth: !isMobile ? 384 : 328 }}
            closeIcon={
                !className && <CloseOutlined className={'close'} data-test-id={dataTestId} />
            }
            closable={!className}
        >
            <CloseCircleOutlined className={'icon'} />
            <div className={'wrapper-content'}>
                <h6 className={'title'} data-test-id='modal-error-user-training-title'>
                    {tittle}
                </h6>
                <p className={'text'} data-test-id='modal-error-user-training-subtitle'>
                    {text}
                </p>
                <Button
                    className={'button-error style'}
                    onClick={handleOk}
                    type={'primary'}
                    size={'large'}
                    data-test-id={dataTestId}
                >
                    Закрыть
                </Button>
            </div>
        </Modal>
    );
};
