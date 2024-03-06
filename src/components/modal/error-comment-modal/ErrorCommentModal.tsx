import React, { useEffect, useState } from 'react';
import { Modal, Result } from 'antd';
import { ResultStatusType } from '@constants/constants.ts';
import { DefaultButton } from '@components/buttons/DefaultButton.tsx';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';
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

    const handleRepeatComment = () => {
        setIsModalOpen(true);
        closeModal();
    };

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
                status={ResultStatusType.ERROR}
                title='Данные не сохранились'
                subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                extra={[
                    <PrimaryButton
                        className={'style-second'}
                        htmlType={'button'}
                        onClick={handleRepeatComment}
                        dataTestId={'write-review-not-saved-modal'}
                        text={'Написать отзыв'}
                        buttonKey={'rep'}
                        key={'rep'}
                    />,
                    <DefaultButton
                        className={'default-button'}
                        onClick={closeModal}
                        text={'Закрыть'}
                        icon={null}
                        buttonKey={'close'}
                        key={'close'}
                    />,
                ]}
            />
        </Modal>
    );
};
