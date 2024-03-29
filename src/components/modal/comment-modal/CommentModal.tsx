import { Form, Input, Modal, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import './Commnet.css';
import { useSendFeedbackMutation } from '@redux/reducers/apiSlice.ts';
import { history } from '@redux/reducers/routerSlice.ts';
import { JVT_TOKEN, paths, statusCodes } from '@constants/constants.ts';
import { SuccessModal } from '@components/modal/success-modal/SuccessModal.tsx';
import { ErrorCommentModal } from '@components/modal/error-comment-modal/ErrorCommentModal.tsx';

type CommentsListProps = {
    isModal: boolean;
    closeModal: () => void;
};

export const CommentModal: React.FC<CommentsListProps> = ({ isModal, closeModal }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [sendFeedback, { data, error }] = useSendFeedbackMutation();
    const [isModalSuccess, setIsModalSuccess] = useState(false);
    const [isModalCommentError, setIsModalCommentError] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (data) {
            form.resetFields();
            setRating(0);
            setIsModalSuccess(true);
        } else if (error) {
            if ('status' in error && error.status === statusCodes.ERROR_403) {
                localStorage.removeItem(JVT_TOKEN);
                sessionStorage.removeItem(JVT_TOKEN);
                history.push(paths.auth.path);
            } else {
                setIsModalCommentError(true);
            }
        }
    }, [data, error, form]);

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
                        className: 'style-second',
                        size: 'large',
                        disabled: rating === 0,
                        ['data-test-id']: 'new-review-submit-button',
                    }}
                    centered={true}
                >
                    <Form form={form}>
                        <Rate
                            character={({ index }) => {
                                if (index === undefined) {
                                    return null;
                                }
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
            <SuccessModal isModal={isModalSuccess} closeModal={() => setIsModalSuccess(false)} />
            <ErrorCommentModal
                isModal={isModalCommentError}
                closeModal={() => setIsModalCommentError(false)}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
};
