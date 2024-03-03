import React, { useEffect, useState } from 'react';
import { Button, Modal, Result } from 'antd';
import './ErrorCommentModal.css';

type ErrorModalProps = {
    isModal: boolean;
    closeModal: () => void;
};

export const ErrorCommentModal: React.FC<ErrorModalProps> = ({ isModal, closeModal }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen(isModal);
    }, [isModal]);

    return (
        <Modal
            className={'error-comment-modal'}
            open={isModalOpen}
            footer={null}
            closeIcon={null}
            width={'100%'}
            centered={true}
        >
            <Result
                status='error'
                title='&nbsp;Данные не сохранились&nbsp;'
                subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                extra={[
                    <Button
                        type='primary'
                        size={'large'}
                        onClick={() => {
                            closeModal();
                        }}
                    >
                        Написать отзыв
                    </Button>,
                    <Button key='buy' size={'large'}>
                        Закрыть
                    </Button>,
                ]}
            />
        </Modal>
    );
};
