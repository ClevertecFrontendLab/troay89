import React from 'react';
import { Typography, Layout } from 'antd';
import { ArrowLeftOutlined, SettingOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { BreadcrumbComponent } from '@components/breadcrumb/BreadcrumbComponent.tsx';
import { useLocation } from 'react-router-dom';
import './AppHeader.css';
import { history } from '@redux/reducers/routerSlice.ts';
import { paths } from '@constants/constants.ts';

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

    const handleClick = () => history.push(paths.setting.path);
    const handleClickBack = () => history.back();

    if (location.pathname === '/profile') {
        return (
            <Header className={'header-two'} style={{ padding: 0 }}>
                <h1 className={'title'}>Профиль</h1>
                <div
                    className={'wrapper-sitting'}
                    onClick={handleClick}
                    data-test-id='header-settings'
                >
                    <Settings isMobile={false} isTablet={false} />
                    {!isMobile && 'Настройки'}
                </div>
            </Header>
        );
    }
    if (location.pathname === '/settings') {
        return (
            <Header className={'header-setting'} style={{ padding: 0 }}>
                <div className={'wrapper-content'}>
                    <ArrowLeftOutlined onClick={handleClickBack} data-test-id='settings-back' />
                    <h1 className={'title'}>Настройки</h1>
                </div>
            </Header>
        );
    }
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
                    <Paragraph
                        className={'header-seating'}
                        onClick={handleClick}
                        data-test-id='header-settings'
                    >
                        <Settings isMobile={isMobile} isTablet={isTablet} />
                        {!isMobile && 'Настройки'}
                    </Paragraph>
                </div>
            )}
            {location.pathname === '/calendar' && (
                <div className={'main-content without-title'}>
                    <Paragraph
                        className={'header-seating'}
                        onClick={handleClick}
                        data-test-id='header-settings'
                    >
                        <Settings isMobile={isMobile} isTablet={isTablet} />
                        {!isMobile && 'Настройки'}
                    </Paragraph>
                </div>
            )}
        </Header>
    );
};
