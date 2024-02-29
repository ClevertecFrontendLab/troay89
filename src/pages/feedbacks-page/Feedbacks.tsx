import React, { useState } from 'react';
import { Layout } from 'antd';
import { SiderComponent } from '@components/sider/SiderComponent.tsx';
import { BreadcrumbComponent } from '@components/header/BreadcrumbComponent.tsx';

export const Feedbacks: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className={'.ant-layout-has-sider'}>
            <SiderComponent isCloseSide={collapsed} setIsCloseSide={setCollapsed} />
            <Layout className='site-layout'>
                <BreadcrumbComponent />
            </Layout>
        </Layout>
    );
};
