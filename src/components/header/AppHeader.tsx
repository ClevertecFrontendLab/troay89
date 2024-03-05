import React from 'react';
import { Typography, Layout } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import './AppHeader.css';
import { BreadcrumbComponent } from '@components/breadcrumb/BreadcrumbComponent.tsx';
import { useLocation } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { Header } = Layout;

type SettingsProps = {
    isMobile: boolean;
    isTablet: boolean;
};

const Settings: React.FC<SettingsProps> = ({ isMobile, isTablet }) => {
    if (isMobile) {
        return (
            <div className={`container-setting ${isMobile ? 'show' : ''}`}>
                <SettingOutlined />
            </div>
        );
    }

    if (!isMobile && !isTablet) {
        return <SettingOutlined />;
    }

    return null;
};

export const AppHeader: React.FC = () => {
    const isTablet = useMediaQuery({ query: '(max-width: 1000px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 815px)' });
    const spaceMobile = !isMobile ? '' : <br />;
    const location = useLocation();

    return (
        <Header className={'ant-layout-header'} style={{ padding: 0 }}>
            <BreadcrumbComponent />
            {location.pathname === '/main' && (
                <div className={'main-content'}>
                    <div className={'block-welcome'}>
                        <Title className={'title-header'}>
                            Приветствуем тебя {spaceMobile} в CleverFit — приложении, <br /> которое
                            поможет тебе добиться своей мечты!
                        </Title>
                    </div>
                    <Paragraph className={'header-seating'}>
                        <Settings isMobile={isMobile} isTablet={isTablet} />
                        {!isMobile && 'Настройки'}
                    </Paragraph>
                </div>
            )}
        </Header>
    );
};
