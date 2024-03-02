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
    const [getFeedbacks, { data, error }] = useLazyGetFeedbacksQuery();

    useEffect(() => {
        if (data) {
            dispatch(saveComments(data));
            history.push('/feedbacks');
        } else if (error) {
            if ('status' in error && error.status === 403) {
                history.push('/auth');
            }
        }
    }, [data, dispatch, error]);

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
