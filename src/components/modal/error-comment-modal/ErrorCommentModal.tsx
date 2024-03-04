import React, { useEffect, useState } from 'react';
import { Button, Modal, Result } from 'antd';
import './ErrorCommentModal.css';

type ErrorModalProps = {
    isModal: boolean;
    closeModal: () => void;
    setIsModalOpen(value: boolean): void;
};

export const ErrorCommentModal: React.FC<ErrorModalProps> = ({
    isModal,
    closeModal,
    setIsModalOpen,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(isModal);
    }, [isModal]);

    return (
        <Modal
            className={'error-comment-modal'}
            open={isOpen}
            footer={null}
            closeIcon={null}
            width={'100%'}
            centered={true}
        >
            <Result
                status='error'
                title='Данные не сохранились'
                subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                extra={[
                    <Button
                        type='primary'
                        size={'large'}
                        key={'rep'}
                        onClick={() => {
                            setIsModalOpen(true);
                            closeModal();
                        }}
                    >
                        Написать отзыв
                    </Button>,
                    <Button
                        key='close'
                        size={'large'}
                        onClick={() => {
                            closeModal();
                        }}
                    >
                        Закрыть
                    </Button>,
                ]}
            />
        </Modal>
    );
};
