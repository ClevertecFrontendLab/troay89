import React, { useState } from 'react';
import { Button, Card, Checkbox, Image, Input, Layout, Space, Typography } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import logoAuth from '/img/svg/logo-auth.svg';
import './Auth.css';
import { SearchOutlined } from '@ant-design/icons';

const tabList = [
    {
        key: 'tab1',
        tab: 'Вход',
    },
    {
        key: 'tab2',
        tab: 'Регестрация',
    },
];

const { Link } = Typography;

const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
};

const contentList: Record<string, React.ReactNode> = {
    tab1: (
        <Space direction='vertical'>
            <Space direction='vertical'>
                <Input size='large' addonBefore='email' />
                <Input.Password size='large' placeholder='Пороль' />
            </Space>
            <Space>
                <Checkbox onChange={onChange}>
                    Запомнить меня{' '}
                    <Link href='https://ant.design' target='_blank'>
                        Забыли пароль?
                    </Link>
                </Checkbox>
            </Space>
            <Space direction={'vertical'}>
                <Button type='primary'>Войти</Button>
                <Button icon={<SearchOutlined />}>Search</Button>
            </Space>
        </Space>
    ),
    tab2: <p>content2</p>,
};

export const Auth: React.FC = () => {
    const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');
    const { Content } = Layout;

    const onTabChange = (key: string) => {
        setActiveTabKey1(key);
    };

    return (
        <Layout className={'auth-layout'}>
            <Content className={'container-auth'}>
                <Card
                    className={'auth-card'}
                    title={<Image src={logoAuth} alt={'logo for auth'} className={'logo-auth'} />}
                    tabList={tabList}
                    activeTabKey={activeTabKey1}
                    onTabChange={onTabChange}
                >
                    {contentList[activeTabKey1]}
                </Card>
            </Content>
        </Layout>
    );
};
