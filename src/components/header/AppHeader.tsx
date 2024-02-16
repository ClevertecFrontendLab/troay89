import React from 'react';
import { Typography, Layout } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import './AppHeader.css';

const { Title, Paragraph } = Typography;
const { Header } = Layout;

export const AppHeader: React.FC = () => {
    const isTablet = useMediaQuery({ query: '(max-width: 1000px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 815px)' });
    const spaceMobile = !isMobile ? '' : <span className={'transfer-mobile'}></span>;

    return (
        <Header className={'ant-layout-header'} style={{ padding: 0 }}>
            <div className={'block-welcome'}>
                <Paragraph className={'type-page'}>Главная</Paragraph>
                <Title className={'title-header'}>
                    Приветствуем тебя {spaceMobile}
                    {spaceMobile}
                    {spaceMobile}
                    {spaceMobile} в CleverFit — приложении, <br /> которое поможет тебе добиться
                    своей мечты!
                </Title>
            </div>
            <Paragraph className={'header-seating'}>
                {!isMobile && isTablet ? (
                    ''
                ) : isMobile ? (
                    <div className={`container-setting ${isMobile ? 'show' : ''}`}>
                        <SettingOutlined />
                    </div>
                ) : (
                    <SettingOutlined />
                )}
                {!isMobile && 'Настройки'}
            </Paragraph>
        </Header>
    );
};
