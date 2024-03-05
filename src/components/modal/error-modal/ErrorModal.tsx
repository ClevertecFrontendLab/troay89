import React, { useEffect, useState } from 'react';
import { Button, Modal, Result } from 'antd';
import { history } from '@redux/reducers/routerSlice.ts';
import './ErrorModal.css';
import { paths, ResultStatusType } from '@constants/constants.ts';

type ErrorModalProps = {
    isModal: boolean;
    closeModal: () => void;
};

export const ErrorModal: React.FC<ErrorModalProps> = ({ isModal, closeModal }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen(isModal);
    }, [isModal]);

    return (
        <Modal
            className={'error-modal'}
            open={isModalOpen}
            footer={null}
            closeIcon={null}
            width={'100%'}
        >
            <Result
                status={ResultStatusType.ERROR_500}
                title='&nbsp;&nbsp;Что-то пошло не так&nbsp;'
                subTitle='&nbsp;Произошла ошибка, попробуйте ещё раз.'
                extra={
                    <Button
                        type='primary'
                        size={'large'}
                        onClick={() => {
                            closeModal();
                            history.push(paths.main.path);
                        }}
                    >
                        Назад
                    </Button>
                }
            />
        </Modal>
    );
};
