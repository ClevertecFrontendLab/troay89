import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { User, UserCheckEmail } from '../../../type/User.ts';
import { useAuthCheckEmailMutation, useAuthUserMutation } from '@redux/reducers/apiSlice.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useMediaQuery } from 'react-responsive';
import { history } from '@redux/reducers/routerSlice.ts';
import { saveDataEmail } from '@redux/reducers/userEmailSlice.ts';

interface AuthComponentProps {
    setIsLoading(value: boolean): void;
}

export const AuthComponent: React.FC<AuthComponentProps> = ({ setIsLoading }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const userEmail: UserCheckEmail = useAppSelector((state) => state.saveEmail.saveUserEmail);
    const [isSaveData, setIsSaveData] = useState<boolean>(false);
    const [authUser, { data: authData, isLoading: authIsLoading, error: authError }] =
        useAuthUserMutation();
    const [
        authCheckEmail,
        { data: checkEmailData, isLoading: checkEmailIsLoading, error: checkEmailError },
    ] = useAuthCheckEmailMutation();
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

    const onFinish = (values: User) => {
        values.isSave ? setIsSaveData(values.isSave) : null;
        authUser({ email: values.email, password: values.password });
    };

    const handleForgotClick = () => {
        const emailValue = form.getFieldValue('email');
        const userCheckEmail: UserCheckEmail = { email: emailValue };
        dispatch(saveDataEmail(userCheckEmail));
        authCheckEmail({ email: emailValue });
    };

    useEffect(() => {
        if (history.location.state?.from === '/auth/confirm-email') {
            authCheckEmail(userEmail);
        }
    }, [authCheckEmail, userEmail]);

    useEffect(() => {
        if (authData) {
            setIsLoading(authIsLoading);
            isSaveData
                ? localStorage.setItem('jwtToken', authData.accessToken)
                : sessionStorage.setItem('jwtToken', authData.accessToken);
            history.push('/main');
        } else if (authError) {
            setIsLoading(authIsLoading);
            history.push('/result/error-login', { from: '/auth' });
        } else if (authIsLoading) {
            setIsLoading(authIsLoading);
        }
    }, [authData, authError, authIsLoading, isSaveData, setIsLoading]);

    useEffect(() => {
        if (checkEmailData) {
            setIsLoading(checkEmailIsLoading);
            history.push('/auth/confirm-email');
        } else if (checkEmailError) {
            setIsLoading(checkEmailIsLoading);
            if (
                'status' in checkEmailError &&
                checkEmailError.status === 404 &&
                checkEmailError.data.message === 'Email не найден'
            ) {
                history.push('/result/error-check-email-no-exist', { from: '/auth' });
            } else {
                history.push('/result/error-check-email', { from: '/auth' });
            }
        } else if (checkEmailIsLoading) {
            setIsLoading(checkEmailIsLoading);
        }
    }, [checkEmailData, checkEmailError, checkEmailIsLoading, setIsLoading]);

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
                            autoComplete={'email'}
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
                        <Input.Password
                            className={'auth-input'}
                            placeholder='Пaроль'
                            autoComplete={'current-password'}
                        />
                    </Form.Item>
                </Space>
                <Space className={'extra-container'}>
                    <Form.Item className={'auth-check'} name='isSave' valuePropName={'checked'}>
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>
                    <Button type='link' className={'forgot-link'} onClick={handleForgotClick}>
                        Забыли пароль?
                    </Button>
                </Space>
                <Space className={'container-auth-buttons'} direction={'vertical'}>
                    <Button className={'auth-enter'} type='primary' htmlType='submit'>
                        Войти
                    </Button>
                    <Button
                        className={'auth-enter auth-google'}
                        icon={!isMobile ? <GooglePlusOutlined /> : ''}
                    >
                        Войти через Google
                    </Button>
                </Space>
            </Space>
        </Form>
    );
};
