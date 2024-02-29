import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Space } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { User } from '../../../type/User.ts';
import { useAuthCheckEmailMutation, useAuthUserMutation } from '@redux/reducers/apiSlice.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useMediaQuery } from 'react-responsive';
import { history } from '@redux/reducers/routerSlice.ts';
import { saveDataEmail } from '@redux/reducers/userEmailSlice.ts';
import { FieldData } from 'rc-field-form/lib/interface';
import { EmailInput } from '@components/input/EmailInput.tsx';
import { PasswordInput } from '@components/input/PasswordInput.tsx';

interface AuthComponentProps {
    setIsLoading(value: boolean): void;
}

export const AuthComponent: React.FC<AuthComponentProps> = ({ setIsLoading }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    const [isSaveData, setIsSaveData] = useState<boolean>(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isRedColor, setIsRedColor] = useState(false);
    const userEmail = useAppSelector((state) => state.saveEmail.saveUserEmail);
    const [authUser, { data: authData, isLoading: authIsLoading, error: authError }] =
        useAuthUserMutation();
    const [
        authCheckEmail,
        { data: checkEmailData, isLoading: checkEmailIsLoading, error: checkEmailError },
    ] = useAuthCheckEmailMutation();

    const onFieldsChange = (_: FieldData[], allFields: FieldData[]) => {
        const emailField = allFields.find((field) => field.name[0] === 'email') as FieldData;
        setIsEmailEmpty(Boolean(emailField.value));
        setIsRedColor(!emailField.value);
        const isValidNow = (emailField.errors && !emailField.errors.length) as boolean;
        setIsEmailValid(isValidNow);
    };

    const onFinish = (values: User) => {
        values.isSave ? setIsSaveData(values.isSave) : null;
        authUser({ email: values.email, password: values.password });
    };

    const handleForgotClick = () => {
        setIsRedColor(true);
        if (isEmailEmpty && isEmailValid) {
            setIsRedColor(false);
            const emailValue = form.getFieldValue('email');
            dispatch(saveDataEmail(emailValue));
            authCheckEmail({ email: emailValue });
        }
    };

    useEffect(() => {
        if (
            history.location.state &&
            typeof history.location.state === 'object' &&
            'from' in history.location.state &&
            history.location.state?.from === '/result/error-check-email'
        ) {
            authCheckEmail({ email: userEmail });
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
            history.push('/auth/confirm-email', { from: '/auth' });
        } else if (checkEmailError) {
            setIsLoading(checkEmailIsLoading);
            if (
                'status' in checkEmailError &&
                checkEmailError.status === 404 &&
                typeof checkEmailError.data === 'object' &&
                checkEmailError.data !== null &&
                'message' in checkEmailError.data &&
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
        <Form form={form} name='auth' onFinish={onFinish} onFieldsChange={onFieldsChange}>
            <Space direction='vertical'>
                <Space direction='vertical'>
                    <EmailInput
                        className={'auth-input auth-input-email'}
                        validateStatus={isRedColor || !isEmailValid ? 'error' : 'success'}
                        dataTestId='login-email'
                    />
                    <PasswordInput
                        className={'auth-input'}
                        placeholder={'Пароль'}
                        dataTestId={'login-password'}
                        autoComplete={'current-password'}
                        helpText={''}
                    />
                </Space>
                <Space className={'extra-container'}>
                    <Form.Item className={'auth-check'} name='isSave' valuePropName={'checked'}>
                        <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                    </Form.Item>
                    <Button
                        type='link'
                        className={'forgot-link'}
                        onClick={handleForgotClick}
                        data-test-id='login-forgot-button'
                    >
                        Забыли пароль?
                    </Button>
                </Space>
                <Space className={'container-auth-buttons'} direction={'vertical'}>
                    <Button
                        className={'auth-enter'}
                        type='primary'
                        htmlType='submit'
                        data-test-id='login-submit-button'
                    >
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
