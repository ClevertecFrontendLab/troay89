import { Layout } from 'antd';
import React, { useState } from 'react';

import 'antd/dist/antd.css';
import './launch-page.css';
import { AppHeader } from '@components/header/AppHeader.tsx';
import { SiderComponent } from '@components/sider/SiderComponent.tsx';
import {MainPage} from "../main-page/MainPage.tsx";
import {FooterComponent} from "@components/footer/Footer.tsx";

export const LaunchPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout>
            <SiderComponent isCloseSide={collapsed} setIsCloseSide={setCollapsed} />
            <Layout className='site-layout'>
                <AppHeader />
                <MainPage />
                <FooterComponent />
            </Layout>
        </Layout>
    );
};
