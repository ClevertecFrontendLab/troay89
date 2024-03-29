import { Modal, Result } from 'antd';
import React, { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import './SuccessBuy.css';
import { JVT_TOKEN, paths } from '@constants/constants.ts';
import { history } from '@redux/reducers/routerSlice.ts';
import { useMediaQuery } from 'react-responsive';

type SuccessBuyProps = {
    isOpen: boolean;
    closeModal: () => void;
    email: string | undefined;
};

export const SuccessBuy: React.FC<SuccessBuyProps> = ({ isOpen, closeModal, email }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

    const text = (
        <span>
            Мы отправили инструкцию для оплаты вам на e-mail <b>{email}.</b> После подтверждения
            оплаты войдите в приложение заново.
        </span>
    );

    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    const handleCancel = () => {
        localStorage.removeItem(JVT_TOKEN);
        sessionStorage.removeItem(JVT_TOKEN);
        history.push(paths.auth.path);
        setIsModalOpen(false);
        closeModal();
    };

    return (
        <Modal
            data-test-id='tariff-modal-success'
            className={'success-buy'}
            maskStyle={{ backgroundColor: 'rgba(121, 156, 212, 0)' }}
            open={isModalOpen}
            centered={true}
            onCancel={handleCancel}
            width={isMobile ? 328 : 539}
            maskClosable={false}
            closeIcon={<CloseOutlined className={'close'} />}
            footer={false}
        >
            <Result
                status='success'
                title='Чек для оплаты у вас на почте'
                subTitle={text}
                extra={[<p>Не пришло письмо? Проверьте папку Спам.</p>]}
            />
        </Modal>
    );
};
