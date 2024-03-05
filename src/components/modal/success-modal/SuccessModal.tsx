import React, { useEffect, useState } from 'react';
import { Button, Modal, Result } from 'antd';
import './SuccessModal.css';
import { useLazyGetFeedbacksQuery } from '@redux/reducers/apiSlice.ts';
import { saveComments } from '@redux/reducers/commentsSlice.ts';
import { history } from '@redux/reducers/routerSlice.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { JVT_TOKEN, paths, ResultStatusType, statusCodes } from '@constants/constants.ts';

type ErrorModalProps = {
    isModal: boolean;
    closeModal: () => void;
};

export const SuccessModal: React.FC<ErrorModalProps> = ({ isModal, closeModal }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const [getFeedbacks, { data, error }] = useLazyGetFeedbacksQuery();

    useEffect(() => {
        if (data) {
            dispatch(saveComments(data));
        } else if (error) {
            if ('status' in error && error.status === statusCodes.ERROR_403) {
                localStorage.removeItem(JVT_TOKEN);
                sessionStorage.removeItem(JVT_TOKEN);
                history.push(paths.auth.path);
            }
        }
    }, [data, dispatch, error]);

    useEffect(() => {
        setIsModalOpen(isModal);
        if (isModalOpen) {
            getFeedbacks();
        }
    }, [getFeedbacks, isModal, isModalOpen]);

    return (
        <Modal
            className={'success-modal'}
            open={isModalOpen}
            footer={null}
            closeIcon={null}
            width={'100%'}
            centered={true}
        >
            <Result
                status={ResultStatusType.SUCCESS}
                title='Отзыв успешно опубликован'
                extra={
                    <Button type='primary' size={'large'} onClick={closeModal}>
                        Отлично
                    </Button>
                }
            />
        </Modal>
    );
};
