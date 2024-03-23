import { Card, Form, Layout } from 'antd';
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
import { paths } from '@constants/constants.ts';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';

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
            history.location.state?.from === paths.errorChangePasswordGeneral.path
        ) {
            changePassword({ password: userData.password, confirmPassword: userData.password });
        }
    }, [changePassword, userData.password]);

    useEffect(() => {
        if (data) {
            history.push(paths.successChangePassport.path);
        } else if (error) {
            history.push(paths.errorChangePasswordGeneral.path);
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
                            isCheckStartData={true}
                            helpText={'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
                            setIsTextPass={setIsTextPass}
                        />
                        <ConfirmPasswordInput
                            className={'change-passport-input'}
                            classNameForm={'wrapper-change-passport-input'}
                            placeholder={'Повторите пароль'}
                            autoComplete={'new-password'}
                            isCheckStartData={true}
                            dataTestId={'change-confirm-password'}
                            dependence={'password'}
                        />
                        <PrimaryButton
                            className={'button-change-passport style'}
                            htmlType={'submit'}
                            text={'Сохранить'}
                            dataTestId={'change-submit-button'}
                        />
                    </Form>
                </Card>
            </Content>
        </Layout>
    );
};
