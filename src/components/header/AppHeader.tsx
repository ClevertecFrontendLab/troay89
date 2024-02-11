import React from 'react';
import { Typography, Layout } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import styles from './AppHeader.module.css';

const { Title, Paragraph } = Typography;
const { Header } = Layout;


export const AppHeader: React.FC = () => {
    return (
        <Header className={styles['ant-layout-header']} style={{ padding: 0 }}>
            <div className={styles['block-welcome']}>
                <Paragraph className={styles['type-page']}>Главная</Paragraph>
                <Title className={styles['title-header']}>
                    Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                    мечты!
                </Title>
            </div>
            <Paragraph className={styles['header-seating']}>
                <SettingOutlined />
                Настройки
            </Paragraph>
        </Header>
    );
};
