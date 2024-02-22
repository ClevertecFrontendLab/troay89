import { Button, Card, Form, Input, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { history } from '@redux/reducers/routerSlice.ts';
import './ChangePassword.css';
import { User } from '../../type/User.ts';
import { useAuthChangePasswordMutation } from '@redux/reducers/apiSlice.ts';
import { Loader } from '@components/loader/Loader.tsx';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { saveDataNewPassword } from '@redux/reducers/userNewPassword.ts';

const { Content } = Layout;

export const ChangePassword: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [isTextPass, setIsTextPass] = useState(true);
    const [changePassword, { data, isLoading, error }] = useAuthChangePasswordMutation();
    const userData = useAppSelector((state) => state.saveNewPassword.saveUserNewPassword);

    useEffect(() => {
        if (history.location.state?.from === '/result/error-change-password') {
            changePassword({ password: userData.password, confirmPassword: userData.password });
        }
    }, [changePassword]);

    useEffect(() => {
        if (data) {
            history.push('/result/success-change-password');
        } else if (error) {
            history.push('/result/error-change-password');
        }
    }, [data, error]);

    const onFinish = (values: User) => {
        dispatch(saveDataNewPassword({ password: values.password }));
        changePassword({ password: values.password, confirmPassword: values.confirmPassword });
    };

    return (
        <Layout className={'wrapper-layout-change-password'}>
            <Content className={'wrapper-content-change-password'}>
                {isLoading && <Loader />}
                <Card className={'card-change-password'}>
                    <h3 className={'title-change-password'}>Восстановление аккауанта</h3>
                    <Form
                        className={'form-change-password'}
                        form={form}
                        name='password'
                        onFinish={onFinish}
                    >
                        <Form.Item
                            className={'wrapper-change-passport-input'}
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                },
                                () => ({
                                    validator(_, value) {
                                        if (
                                            value &&
                                            !value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
                                        ) {
                                            setIsTextPass(false);
                                            return Promise.reject(
                                                Error(
                                                    'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                                ),
                                            );
                                        }
                                        setIsTextPass(true);
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                            help={'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
                        >
                            <Input.Password
                                className={`change-passport-input ${
                                    isTextPass ? 'another-color' : ''
                                }`}
                                placeholder='Новый пaроль'
                                autoComplete={'new-password'}
                                size={'large'}
                            ></Input.Password>
                        </Form.Item>
                        <Form.Item
                            className={'wrapper-change-passport-input'}
                            name='confirmPassword'
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
                                className={'change-passport-input'}
                                placeholder='Повторите пaроль'
                                size={'large'}
                                autoComplete={'new-password'}
                            ></Input.Password>
                        </Form.Item>
                        <Button
                            className={'button-change-passport'}
                            type='primary'
                            htmlType='submit'
                            size={'large'}
                        >
                            Сохранить
                        </Button>
                    </Form>
                </Card>
            </Content>
        </Layout>
    );
};
