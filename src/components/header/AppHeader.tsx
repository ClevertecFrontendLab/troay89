import React from 'react';
import { Typography, Layout } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import './AppHeader.css';

const { Title, Paragraph } = Typography;
const { Header } = Layout;


export const AppHeader: React.FC = () => {
    return (
        <Header className={'ant-layout-header'} style={{ padding: 0 }}>
            <div className={'block-welcome'}>
                <Paragraph className={'type-page'}>Главная</Paragraph>
                <Title className={'title-header'}>
                    Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                    мечты!
                </Title>
            </div>
            <Paragraph className={'header-seating'}>
                <SettingOutlined />
                Настройки
            </Paragraph>
        </Header>
    );
};
