import React from 'react';
import { Layout } from 'antd';
import './Footer.css';
import { history } from '@redux/reducers/routerSlice.ts';

const { Footer } = Layout;

export const FooterComponent: React.FC = () => (
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
