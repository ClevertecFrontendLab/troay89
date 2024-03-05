import React from 'react';
import { Layout } from 'antd';
import { history } from '@redux/reducers/routerSlice.ts';
import './Footer.css';
import { paths } from '@constants/constants.ts';

const { Footer } = Layout;

export const FooterComponent: React.FC = () => {
    return (
        <Footer className={'footer-configuration'}>
            <p
                data-test-id='see-reviews'
                className={'footer-review'}
                onClick={() => {
                    history.push(paths.feedbacks.path);
                }}
            >
                Смотреть отзывы{' '}
            </p>
        </Footer>
    );
};
