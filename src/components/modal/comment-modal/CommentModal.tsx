import { Form, Input, Modal, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import './Commnet.css';
import { useSendFeedbackMutation } from '@redux/reducers/apiSlice.ts';
import { history } from '@redux/reducers/routerSlice.ts';

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
            form.resetFields();
            setRating(0);
            setSuccess(true);
        } else if (error) {
            if ('status' in error && error.status === 403) {
                localStorage.removeItem('jwtToken');
                sessionStorage.removeItem('jwtToken');
                history.push('/auth');
            } else {
                setFailed(true);
            }
        }
    }, [data, error, form, setFailed, setSuccess]);

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
        <span className={'wrapper-create-comment'}>
            <Modal
                maskStyle={{ backgroundColor: 'rgba(121, 156, 212, 0)' }}
                className={'modal-create-comment'}
                title='Ваш отзыв'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Опубликовать'
                width={'100%'}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{
                    size: 'large',
                    disabled: rating === 0,
                    ['data-test-id']: 'new-review-submit-button',
                }}
                centered={true}
            >
                <Form form={form}>
                    <Rate
                        character={({ index }) => {
                            return index < rating ? (
                                <StarFilled />
                            ) : (
                                <StarOutlined className={'empty'} />
                            );
                        }}
                        onChange={setRating}
                    />
                    <Form.Item name='comment'>
                        <TextArea className={'area-comment'} autoSize={{ minRows: 2 }} />
                    </Form.Item>
                </Form>
            </Modal>
        </span>
    );
};
