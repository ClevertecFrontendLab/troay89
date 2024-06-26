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
import { JVT_TOKEN, paths, ResultStatusType, statusCodes } from '@constants/constants.ts';
import { DefaultButton } from '@components/buttons/DefaultButton.tsx';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';

type AuthComponentProps = {
    setIsLoading(value: boolean): void;
};

export const AuthComponent: React.FC<AuthComponentProps> = ({ setIsLoading }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    const [isSaveData, setIsSaveData] = useState<boolean>(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isRedColor, setIsRedColor] = useState(false);
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
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

    const handleGoogleClick = () => {
        window.location.href = 'https://marathon-api.clevertec.ru/auth/google';
    };

    useEffect(() => {
        if (
            history.location.state &&
            typeof history.location.state === 'object' &&
            'from' in history.location.state &&
            history.location.state?.from === paths.errorResetEmail.path
        ) {
            authCheckEmail({ email: userEmail });
        }
    }, [authCheckEmail, userEmail]);

    useEffect(() => {
        if (authData) {
            setIsLoading(authIsLoading);
            isSaveData
                ? localStorage.setItem(JVT_TOKEN, authData.accessToken)
                : sessionStorage.setItem(JVT_TOKEN, authData.accessToken);
            history.push(paths.main.path);
        } else if (authError) {
            setIsLoading(authIsLoading);
            history.push(paths.errorAuthGeneral.path, { from: paths.auth.path });
        } else if (authIsLoading) {
            setIsLoading(authIsLoading);
        }
    }, [authData, authError, authIsLoading, isSaveData, setIsLoading]);

    useEffect(() => {
        if (checkEmailData) {
            setIsLoading(checkEmailIsLoading);
            history.push(paths.confirmEmail.path, { from: paths.auth.path });
        } else if (checkEmailError) {
            setIsLoading(checkEmailIsLoading);
            if (
                'status' in checkEmailError &&
                checkEmailError.status === statusCodes.ERROR_404 &&
                typeof checkEmailError.data === 'object' &&
                checkEmailError.data !== null &&
                'message' in checkEmailError.data &&
                checkEmailError.data.message === 'Email не найден'
            ) {
                history.push(paths.errorResetEmail.path, { from: paths.auth.path });
            } else {
                history.push(paths.errorCheckEmailGeneral.path, { from: paths.auth.path });
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
                        autoComplete={'email'}
                        validateStatus={
                            isRedColor || !isEmailValid
                                ? ResultStatusType.ERROR
                                : ResultStatusType.SUCCESS
                        }
                        dataTestId='login-email'
                    />
                    <PasswordInput
                        className={'auth-input'}
                        placeholder={'Пароль'}
                        dataTestId={'login-password'}
                        autoComplete={'current-password'}
                        isCheckStartData={true}
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
                    <PrimaryButton
                        className={'auth-enter'}
                        htmlType={'submit'}
                        dataTestId={'login-submit-button'}
                        text={'Войти'}
                    />
                    <DefaultButton
                        className={'auth-enter default-button'}
                        text={'Войти через Google'}
                        onClick={handleGoogleClick}
                        icon={!isMobile ? <GooglePlusOutlined /> : null}
                    />
                </Space>
            </Space>
        </Form>
    );
};
