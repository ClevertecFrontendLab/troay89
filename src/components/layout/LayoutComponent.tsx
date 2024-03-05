import { Layout } from 'antd';
import React, { ReactNode, useState } from 'react';
import { AppHeader } from '@components/header/AppHeader.tsx';
import { SiderComponent } from '@components/sider/SiderComponent.tsx';
import { FooterComponent } from '@components/footer/Footer.tsx';
import './LayoutComponent.css';
import { useLocation } from 'react-router-dom';

type LayoutComponentProps = {
    children: (collapsed: boolean) => ReactNode;
};

export const LayoutComponent: React.FC<LayoutComponentProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <Layout className={'.ant-layout-has-sider'}>
            <SiderComponent isCloseSide={collapsed} setIsCloseSide={setCollapsed} />
            <Layout className='site-layout'>
                <AppHeader />
                {children(collapsed)}
                {location.pathname === '/main' && <FooterComponent />}
            </Layout>
        </Layout>
    );
};
