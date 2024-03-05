import React, { useEffect, useState } from 'react';
import { Button, Form, Space } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { User } from '../../../type/User.ts';
import { FieldData } from 'rc-field-form/lib/interface';
import { saveDataUser } from '@redux/reducers/userSlice.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useRegisterUserMutation } from '@redux/reducers/apiSlice.ts';
import { history } from '@redux/reducers/routerSlice.ts';
import { useMediaQuery } from 'react-responsive';
import { EmailInput } from '@components/input/EmailInput.tsx';
import { PasswordInput } from '@components/input/PasswordInput.tsx';
import { ConfirmPasswordInput } from '@components/input/ConfirmPasswordInput.tsx';
import { paths, statusCodes } from '@constants/constants.ts';

type RegistrationComponentProps = {
    setIsLoading(value: boolean): void;
};

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
            history.location.state?.from === paths.errorRegistrationEmail.path
        ) {
            registerUser(userData);
        }
    }, [registerUser, userData]);

    useEffect(() => {
        if (data) {
            history.push(paths.successRegistration.path, { from: paths.registration.path });
            setIsLoading(isLoading);
        } else if (error) {
            setIsLoading(isLoading);
            if ('status' in error && error.status === statusCodes.ERROR_409) {
                history.push(paths.errorRegistrationEmail.path, { from: paths.registration.path });
            } else {
                history.push(paths.errorRegistrationGeneral.path, {
                    from: paths.registration.path,
                });
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
                    <EmailInput
                        className={'reg-input reg-input-email'}
                        dataTestId='registration-email'
                    />
                    <PasswordInput
                        className={`reg-input ${isTextPass ? 'another-color' : ''}`}
                        placeholder={'Пароль'}
                        helpText={'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
                        dataTestId={'registration-password'}
                        autoComplete={'new-password'}
                        setIsTextPass={setIsTextPass}
                    />
                </Space>
                <ConfirmPasswordInput
                    className={'reg-input repeat-pass'}
                    dataTestId={'registration-confirm-password'}
                    placeholder={'Повторите пароль'}
                    autoComplete={'new-password'}
                    dependence={'password'}
                />
                <Button
                    className={'reg-enter'}
                    type='primary'
                    htmlType='submit'
                    disabled={!isValid}
                    data-test-id='registration-submit-button'
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
