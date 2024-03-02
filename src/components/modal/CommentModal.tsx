import {Input, Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import {StarFilled, StarOutlined} from "@ant-design/icons";
import './Commnet.css'


type CommentsListProps = {
    isModal: boolean;
    closeModal: () => void;
}

export const CommentModal: React.FC<CommentsListProps> = ({isModal, closeModal}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);

    const handleStarClick = (i: number) => {
        setRating(i + 1);
    };

    useEffect(() => {
        setIsModalOpen(isModal);
    }, [isModal]);

    const {TextArea} = Input;

    const handleOk = () => {
        closeModal();
    };

    const handleCancel = () => {
        closeModal();
    };

    return (
        <>
            <Modal
                className={'modal-create-comment'}
                title='Ваш отзыв'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Опубликовать'
                width={'100%'}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ size: 'large', disabled: rating === 0 }}
            >
                <span className={'rating-comment'}>
                    {Array(5)
                        .fill(null)
                        .map((_, i) =>
                            i < rating ? (
                                <StarFilled
                                    key={i}
                                    className={'full'}
                                    onClick={() => handleStarClick(i)}
                                />
                            ) : (
                                <StarOutlined key={i} onClick={() => handleStarClick(i)} />
                            ),
                        )}
                </span>
                <TextArea className={'area-comment'} rows={2} />
            </Modal>
        </>
    );
};
