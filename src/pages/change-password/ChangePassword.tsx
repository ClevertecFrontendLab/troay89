import { Button, Card, Form, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { history } from '@redux/reducers/routerSlice.ts';
import './ChangePassword.css';
import { UserChangePassword } from '../../type/User.ts';
import { useAuthChangePasswordMutation } from '@redux/reducers/apiSlice.ts';
import { Loader } from '@components/loader/Loader.tsx';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { saveDataNewPassword } from '@redux/reducers/userNewPassword.ts';
import { PasswordInput } from '@components/input/PasswordInput.tsx';
import { ConfirmPasswordInput } from '@components/input/ConfirmPasswordInput.tsx';

const { Content } = Layout;

export const ChangePassword: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [isTextPass, setIsTextPass] = useState(true);
    const [changePassword, { data, isLoading, error }] = useAuthChangePasswordMutation();
    const userData = useAppSelector((state) => state.saveNewPassword.saveUserNewPassword);

    useEffect(() => {
        if (
            history.location.state &&
            typeof history.location.state === 'object' &&
            'from' in history.location.state &&
            history.location.state?.from === '/result/error-change-password'
        ) {
            changePassword({ password: userData.password, confirmPassword: userData.password });
        }
    }, [changePassword, userData.password]);

    useEffect(() => {
        if (data) {
            history.push('/result/success-change-password');
        } else if (error) {
            history.push('/result/error-change-password');
        }
    }, [data, error]);

    const onFinish = (values: UserChangePassword) => {
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
                        <PasswordInput
                            className={`change-passport-input ${isTextPass ? 'another-color' : ''}`}
                            classNameForm={'wrapper-change-passport-input'}
                            placeholder={'Новый пароль'}
                            autoComplete={'new-password'}
                            dataTestId={'change-password'}
                            helpText={'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
                            setIsTextPass={setIsTextPass}
                        />
                        <ConfirmPasswordInput
                            className={'change-passport-input'}
                            classNameForm={'wrapper-change-passport-input'}
                            placeholder={'Повторите пароль'}
                            autoComplete={'new-password'}
                            dataTestId={'change-confirm-password'}
                            dependence={'password'}
                        />
                        <Button
                            className={'button-change-passport'}
                            type='primary'
                            htmlType='submit'
                            size={'large'}
                            data-test-id='change-submit-button'
                        >
                            Сохранить
                        </Button>
                    </Form>
                </Card>
            </Content>
        </Layout>
    );
};
