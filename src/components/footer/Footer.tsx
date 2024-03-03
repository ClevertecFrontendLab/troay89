import React from 'react';
import { Layout } from 'antd';
import { history } from '@redux/reducers/routerSlice.ts';
import './Footer.css';

const { Footer } = Layout;

export const FooterComponent: React.FC = () => {
    return (
        <Footer className={'footer-configuration'}>
            <p
                className={'footer-review'}
                onClick={() => {
                    history.push('/feedbacks');
                }}
            >
                Смотреть отзывы{' '}
            </p>
        </Footer>
    );
};
