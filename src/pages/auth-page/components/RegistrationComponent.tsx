import React, { useEffect } from 'react';
import { Button, Form, Input, Space } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { User } from '../../../type/User.ts';
import { saveDataUser } from '@redux/reducers/userSlice.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useRegisterUserMutation } from '@redux/reducers/apiSlice.ts';
import { history } from '@redux/reducers/routerSlice.ts';
import { changeRequest } from '@redux/reducers/isServerRequestSlice.ts';
import { useMediaQuery } from 'react-responsive';

interface RegistrationComponentProps {
    setIsLoading(value: boolean): void;
}

export const RegistrationComponent: React.FC<RegistrationComponentProps> = ({ setIsLoading }) => {
    const dispatch = useAppDispatch();
    const userData = useAppSelector((state) => state.saveData.saveDataUser);
    const [form] = Form.useForm();
    const [registerUser, { data, isLoading, error }] = useRegisterUserMutation();
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

    useEffect(() => {
        if (history.location.state?.from === '/result/error-user-exist') {
            registerUser(userData);
        }
    }, [registerUser, userData]);

    useEffect(() => {
        if (data) {
            dispatch(changeRequest(true));
            history.push('/result/success');
            setIsLoading(isLoading);
        } else if (error) {
            setIsLoading(isLoading);
            dispatch(changeRequest(true));
            if ('status' in error && error.status === 409) {
                history.push('/result/error-user-exist');
            } else {
                history.push('/result/error');
            }
        } else if (isLoading) {
            setIsLoading(isLoading);
        }
    }, [data, dispatch, error, isLoading, setIsLoading]);

    const onFinish = (values: User) => {
        console.log('Received values of form: ', values);
        dispatch(saveDataUser(values));
        registerUser({ email: values.email, password: values.password });
    };

    return (
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
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                        ),
                                    );
                                },
                            }),
                        ]}
                        help={'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
                    >
                        <Input.Password className={'reg-input'} placeholder='Пaроль' />
                    </Form.Item>
                </Space>
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
                <Button className={'auth-enter'} icon={!isMobile ? <GooglePlusOutlined /> : ''}>
                    Регистрация через Google
                </Button>
            </Space>
        </Form>
    );
};
