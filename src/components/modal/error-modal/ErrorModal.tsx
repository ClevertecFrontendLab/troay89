import React, { useEffect, useState } from 'react';
import { Modal, Result } from 'antd';
import { history } from '@redux/reducers/routerSlice.ts';
import { paths, ResultStatusType } from '@constants/constants.ts';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';
import './ErrorModal.css';

type ErrorModalProps = {
    isModal: boolean;
    closeModal: () => void;
};

export const ErrorModal: React.FC<ErrorModalProps> = ({ isModal, closeModal }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen(isModal);
    }, [isModal]);

    const handleClick = () => {
        closeModal();
        history.push(paths.main.path);
    };

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
                    <PrimaryButton
                        className={'style-second'}
                        text={'Назад'}
                        onClick={handleClick}
                        htmlType={'button'}
                    />
                }
            />
        </Modal>
    );
};
