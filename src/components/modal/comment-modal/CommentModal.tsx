import { Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import './Commnet.css';
import { useSendFeedbackMutation } from '@redux/reducers/apiSlice.ts';

type CommentsListProps = {
    isModal: boolean;
    closeModal: () => void;
    setSuccess(value: boolean): void;
    setFailed(value: boolean): void;
};

export const CommentModal: React.FC<CommentsListProps> = ({
    isModal,
    closeModal,
    setSuccess,
    setFailed,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [sendFeedback, { data, error }] = useSendFeedbackMutation();
    const [form] = Form.useForm();

    useEffect(() => {
        if (data) {
            form.resetFields()
            setRating(0)
            setSuccess(true);
            // setFailed(true);
        } else if (error) {
            setFailed(true);
        }
    }, [data, error, form, setFailed, setSuccess]);

    const handleStarClick = (i: number) => {
        setRating(i + 1);
    };

    useEffect(() => {
        setIsModalOpen(isModal);
    }, [isModal]);

    const { TextArea } = Input;

    const handleOk = async () => {
        const values = form.getFieldsValue();
        sendFeedback({ message: values.comment, rating: rating });
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
                centered={true}
            >
                <Form form={form}>
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
                    <Form.Item name='comment'>
                        <TextArea className={'area-comment'} autoSize={{ minRows: 2 }} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
