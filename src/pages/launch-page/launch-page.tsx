import { Card, Layout } from 'antd';
import React, { useState } from 'react';
import { AppHeader } from '@components/header/AppHeader.tsx';
import { SiderComponent } from '@components/sider/SiderComponent.tsx';
import { MainPage } from '../main-page/MainPage.tsx';
import { FooterComponent } from '@components/footer/Footer.tsx';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import './launch-page.css';

export const LaunchPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className={'.ant-layout-has-sider'}>
            <SiderComponent isCloseSide={collapsed} setIsCloseSide={setCollapsed} />
            <Layout className='site-layout'>
                <AppHeader />
                <MainPage isCloseSide={collapsed} />
                <FooterComponent />
            </Layout>
            <Card className={'contact-card-header'} bordered={false}>
                <p className={'contact-card-header-first-title'}>Скачать на телефон</p>
                <p className={'contact-card-header-second-title'}>Доступно в PRO-тарифе</p>
                <div className={'bord-contact-card'}></div>
                <p className={'icon-contact-card'}>
                    <span className={'container-icon-contact-card'}>
                        {<AndroidFilled />} <span>Android OS</span> {<AppleFilled />}
                        <span>Apple iOS</span>
                    </span>
                </p>
            </Card>
        </Layout>
    );
};
