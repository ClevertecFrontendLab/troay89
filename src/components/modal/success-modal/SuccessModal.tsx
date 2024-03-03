import React, { useEffect, useState } from 'react';
import { Button, Modal, Result } from 'antd';
import './SuccessModal.css';

type ErrorModalProps = {
    isModal: boolean;
    closeModal: () => void;
};

export const SuccessModal: React.FC<ErrorModalProps> = ({ isModal, closeModal }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen(isModal);
    }, [isModal]);

    return (
        <Modal
            className={'success-modal'}
            open={isModalOpen}
            footer={null}
            closeIcon={null}
            width={'100%'}
            centered={true}
        >
            <Result
                status='success'
                title='&nbsp;Отзыв успешно опубликован&nbsp;'
                extra={
                    <Button
                        type='primary'
                        size={'large'}
                        onClick={() => {
                            closeModal();
                        }}
                    >
                        Отлично
                    </Button>
                }
            />
        </Modal>
    );
};
