import React, { useEffect, useState } from 'react';
import { Button, Card, Checkbox, Form, Image, Input, Layout, Space, Typography } from 'antd';
import logoAuth from '/img/svg/logo-auth.svg';
import './Auth.css';
import { history } from '@redux/reducers/routerSlice.ts';
import { useLocation } from 'react-router-dom';
import { GooglePlusOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useRegisterUserMutation } from '@redux/reducers/apiSlice.ts';

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

const { Content } = Layout;

export const Auth: React.FC = () => {
    const location = useLocation();
    const [isValid, setIsValid] = useState(true);
    const [activeTabKey1, setActiveTabKey1] = useState<string>(
        location.pathname === '/auth/registration' ? 'tab2' : 'tab1',
    );
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        registerUser({ email: 'dwadwa', password: 'dwfdew' });
    };

    const contentList: Record<string, React.ReactNode> = {
        tab1: (
            <Form>
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
            </Form>
        ),
        tab2: (
            <Form form={form} name='register' onFinish={onFinish}>
                <Space direction='vertical' style={{ columnGap: 0 }}>
                    <Space className={'container-input-reg'} direction='vertical'>
                        <Form.Item
                            name='email'
                            rules={[
                                {
                                    type: 'email',
                                    message: '',
                                },
                                {
                                    required: true,
                                    message: '',
                                },
                            ]}
                        >
                            <Input
                                className={'reg-input reg-input-email'}
                                size={'large'}
                                addonBefore='e-mail:'
                            />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                },
                                () => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
                                        ) {
                                            setIsValid(true);
                                            return Promise.resolve();
                                        }
                                        setIsValid(false);
                                        return Promise.reject(
                                            new Error(
                                                'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                            ),
                                        );
                                    },
                                }),
                            ]}
                            validateStatus={isValid ? 'success' : 'error'}
                            help={'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
                        >
                            <Input.Password className={'reg-input'} placeholder='Пaроль' />
                        </Form.Item>
                    </Space>
                    {/*<span className={'password-message'}>*/}
                    {/*    Пароль не менее 8 символов, с заглавной буквой и цифрой*/}
                    {/*</span>*/}
                    <Form.Item
                        name='confirm'
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            className={'reg-input repeat-pass'}
                            placeholder='Повторите пaроль'
                        />
                    </Form.Item>
                    <Button className={'reg-enter'} type='primary' htmlType='submit'>
                        Войти
                    </Button>
                    <Button className={'auth-enter'} icon={<GooglePlusOutlined />}>
                        Регистрация через Google
                    </Button>
                </Space>
            </Form>
        ),
    };

    const [registerUser, { data, isLoading, error }] = useRegisterUserMutation();

    useEffect(() => {
        if (data) {
            console.log(data, ' succeeded');
        } else if (error) {
            console.log(error, ' error');
        }
    }, [data, error]);

    useEffect(() => {
        setActiveTabKey1(location.pathname === '/auth/registration' ? 'tab2' : 'tab1');
    }, [location]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Tab') {
                setActiveTabKey1((prevKey) => {
                    const newKey = prevKey === 'tab1' ? 'tab2' : 'tab1';
                    if (newKey === 'tab1') {
                        history.push('/auth');
                    } else if (newKey === 'tab2') {
                        history.push('/auth/registration');
                    }
                    return newKey;
                });
                event.preventDefault();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const onTabChange = (key: string) => {
        setActiveTabKey1(key);
        if (key === 'tab1') {
            history.push('/auth');
        } else if (key === 'tab2') {
            history.push('/auth/registration');
        }
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
