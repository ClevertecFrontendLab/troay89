import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Space } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { User } from '../../../type/User.ts';
import { FieldData } from 'rc-field-form/lib/interface';
import { saveDataUser } from '@redux/reducers/userSlice.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useRegisterUserMutation } from '@redux/reducers/apiSlice.ts';
import { history } from '@redux/reducers/routerSlice.ts';
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
    const [isTextPass, setIsTextPass] = useState(true);
    const [isValid, setIsValid] = useState(true);

    const onFieldsChange = (_: FieldData[], allFields: FieldData[]) => {
        const isValidNow = allFields.every((field) => field.errors && !field.errors.length);
        setIsValid(isValidNow);
    };

    useEffect(() => {
        if (
            history.location.state &&
            typeof history.location.state === 'object' &&
            'from' in history.location.state &&
            history.location.state?.from === '/result/error-user-exist'
        ) {
            registerUser(userData);
        }
    }, [registerUser, userData]);

    useEffect(() => {
        if (data) {
            history.push('/result/success', { from: '/auth/registration' });
            setIsLoading(isLoading);
        } else if (error) {
            setIsLoading(isLoading);
            if ('status' in error && error.status === 409) {
                history.push('/result/error-user-exist', { from: '/auth/registration' });
            } else {
                history.push('/result/error', { from: '/auth/registration' });
            }
        } else if (isLoading) {
            setIsLoading(isLoading);
        }
    }, [data, error, isLoading, setIsLoading]);

    const onFinish = (values: User) => {
        dispatch(saveDataUser(values));
        registerUser({ email: values.email, password: values.password });
    };

    return (
        <Form form={form} name='register' onFinish={onFinish} onFieldsChange={onFieldsChange}>
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
                            className={`reg-input ${isTextPass ? 'another-color' : ''}`}
                            placeholder='Пaроль'
                            autoComplete={'new-password'}
                        />
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
                        autoComplete={'new-password'}
                    />
                </Form.Item>
                <Button
                    className={'reg-enter'}
                    type='primary'
                    htmlType='submit'
                    disabled={!isValid}
                >
                    Войти
                </Button>
                <Button
                    className={'auth-enter auth-google'}
                    icon={!isMobile ? <GooglePlusOutlined /> : ''}
                >
                    Регистрация через Google
                </Button>
            </Space>
        </Form>
    );
};
