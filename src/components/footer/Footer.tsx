import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { history } from '@redux/reducers/routerSlice.ts';
import { useLazyGetFeedbacksQuery } from '@redux/reducers/apiSlice.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import './Footer.css';
import { saveComments } from '@redux/reducers/commentsSlice.ts';

const { Footer } = Layout;

export const FooterComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const [getFeedbacks, { data, isLoading, error }] = useLazyGetFeedbacksQuery();

    useEffect(() => {
        if (data) {
            dispatch(saveComments(data));
            history.push('/feedbacks');
        } else if (error) {
            console.log(error, 2222);
        } else if (isLoading) {
            console.log(isLoading, 33333);
        }
    }, [data, dispatch, error, isLoading]);

    return (
        <Footer className={'footer-configuration'}>
            <p
                className={'footer-review'}
                onClick={() => {
                    getFeedbacks();
                }}
            >
                Смотреть отзывы{' '}
            </p>
        </Footer>
    );
};
