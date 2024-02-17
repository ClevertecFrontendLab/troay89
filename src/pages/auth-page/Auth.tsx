import React, { useState } from 'react';
import { Button, Card, Checkbox, Image, Input, Layout, Space, Typography } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import logoAuth from '/img/svg/logo-auth.svg';
import { GooglePlusOutlined } from '@ant-design/icons';
import './Auth.css';

const tabList = [
    {
        key: 'tab1',
        tab: 'Вход',
    },
    {
        key: 'tab2',
        tab: 'Регистрация',
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
                <Input
                    className={'auth-input auth-input-email'}
                    size={'large'}
                    addonBefore='e-mail:'
                />
                <Input.Password className={'auth-input'} placeholder='Пaроль' />
            </Space>
            <Space className={'extra-container'}>
                <Checkbox onChange={onChange}>Запомнить меня</Checkbox>
                <Link className={'forgot-link'} href='https://ant.design' target='_blank'>
                    Забыли пароль?
                </Link>
            </Space>
            <Space className={'container-auth-buttons'} direction={'vertical'}>
                <Button className={'auth-enter'} type='primary'>
                    Войти
                </Button>
                <Button className={'auth-enter'} icon={<GooglePlusOutlined />}>
                    Войти через Google
                </Button>
            </Space>
        </Space>
    ),
    tab2: (
        <Space direction='vertical' style={{ gap: 0 }}>
            <Space className={'container-input-reg'} direction='vertical'>
                <Input
                    className={'reg-input reg-input-email'}
                    size={'large'}
                    addonBefore='e-mail:'
                />
                <Input.Password className={'reg-input'} placeholder='Пaроль' />
            </Space>
            <span className={'password-message'}>
                Пароль не менее 8 символов, с заглавной буквой и цифрой
            </span>
            <Input.Password className={'reg-input repeat-pass'} placeholder='Повторите пaроль' />
            <Button className={'reg-enter'} type='primary'>
                Войти
            </Button>
            <Button className={'auth-enter'} icon={<GooglePlusOutlined />}>
                Регистрация через Google
            </Button>
        </Space>
    ),
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
                    bordered={false}
                    className={`auth-card ${activeTabKey1 === 'tab2' ? 'reg-card' : ''}`}
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

// maraphon2024front
