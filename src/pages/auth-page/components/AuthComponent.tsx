import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { User } from '../../../type/User.ts';
import { useAuthUserMutation } from '@redux/reducers/apiSlice.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { useMediaQuery } from 'react-responsive';
import { history } from '@redux/reducers/routerSlice.ts';

const { Link } = Typography;

interface AuthComponentProps {
    setIsLoading(value: boolean): void;
}

export const AuthComponent: React.FC<AuthComponentProps> = ({ setIsLoading }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [isSaveData, setIsSaveData] = useState<boolean>(false);
    const [authUser, { data, isLoading, error }] = useAuthUserMutation();
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

    const onFinish = (values: User) => {
        values.isSave ? setIsSaveData(values.isSave) : null;
        authUser({ email: values.email, password: values.password });
    };

    useEffect(() => {
        if (data) {
            setIsLoading(isLoading);
            isSaveData
                ? localStorage.setItem('jwtToken', data.accessToken)
                : sessionStorage.setItem('jwtToken', data.accessToken);
            history.push('/main');
        } else if (error) {
            setIsLoading(isLoading);
            history.push('/result/error-login', { from: '/auth' });
        } else if (isLoading) {
            setIsLoading(isLoading);
        }
    }, [data, dispatch, error, isLoading, isSaveData, setIsLoading]);

    return (
        <Form form={form} name='auth' onFinish={onFinish}>
            <Space direction='vertical'>
                <Space direction='vertical'>
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
                            className={'auth-input auth-input-email'}
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
                        ]}
                    >
                        <Input.Password className={'auth-input'} placeholder='Пaроль' />
                    </Form.Item>
                </Space>
                <Space className={'extra-container'}>
                    <Form.Item className={'auth-check'} name='isSave' valuePropName={'checked'}>
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>
                    <Link className={'forgot-link'} href='https://ant.design' target='_blank'>
                        Забыли пароль?
                    </Link>
                </Space>
                <Space className={'container-auth-buttons'} direction={'vertical'}>
                    <Button className={'auth-enter'} type='primary' htmlType='submit'>
                        Войти
                    </Button>
                    <Button className={'auth-enter'} icon={!isMobile ? <GooglePlusOutlined /> : ''}>
                        Войти через Google
                    </Button>
                </Space>
            </Space>
        </Form>
    );
};
