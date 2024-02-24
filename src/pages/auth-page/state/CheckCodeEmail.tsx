import React, { useEffect, useState } from 'react';
import { Card, Layout } from 'antd';
import { CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import './State.css';
import { history } from '@redux/reducers/routerSlice.ts';
import VerificationInput from 'react-verification-input';
import { UserCheckEmail } from '../../../type/User.ts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useAuthConfirmEmailMutation } from '@redux/reducers/apiSlice.ts';
import { Loader } from '@components/loader/Loader.tsx';
import { useMediaQuery } from 'react-responsive';

const { Content } = Layout;

export const CheckCodeEmail: React.FC = () => {
    const [isError, setIsError] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const userEmail: UserCheckEmail = useAppSelector((state) => state.saveEmail.saveUserEmail);
    const [authConfirmEmail, { data, isLoading, error }] = useAuthConfirmEmailMutation();
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    const newLineMobile = isMobile ? <br /> : '';
    const newLine = isMobile ? '' : <br />;
    const spaceMobile = isMobile ? <>&nbsp;</> : '';
    const space = isMobile ? '' : <>&nbsp;</>;

    const handleInputChange = (value: string) => {
        setInputValue(value);
        if (value.length === 6) {
            authConfirmEmail({ email: userEmail.email, code: value });
            setInputValue('');
        }
    };

    useEffect(() => {
        if (data) {
            history.push('/auth/change-password');
        } else if (error) {
            setIsError(true);
        }
    }, [data, error]);

    return (
        <Layout className={'wrapper-layout-state'}>
            <Content className={'wrapper-content-state'}>
                {isLoading && <Loader />}
                <Card className={'wrapper-card-state wrapper-attention'}>
                    {isError ? (
                        <CloseCircleFilled className={'icon-state status-error-code color'} />
                    ) : (
                        <ExclamationCircleFilled className={'icon-state status-attention color'} />
                    )}
                    {isError ? (
                        <h3 className={'title-state title-attention'}>
                            {space}Неверный код. Введите код {space}
                            {newLine}
                            для восстановления аккауанта
                        </h3>
                    ) : (
                        <h3 className={'title-state title-attention'}>
                            <span>&nbsp;</span>Введите код <span>&nbsp;</span> <br /> для
                            восстановления аккауанта
                        </h3>
                    )}
                    <span className={'message-state message-attention'}>
                        Мы отправили вам на e-mail{' '}
                        <span className={'email-style'}>{userEmail.email}</span>
                        <br /> шестизначный код. Введите его в поле ниже.
                    </span>
                    <VerificationInput
                        value={inputValue}
                        onChange={handleInputChange}
                        classNames={{ character: isError ? 'error' : '' }}
                        validChars={'0-9'}
                        placeholder={''}
                    />
                    <span className={'message-state'}>
                        Не пришло письмо? Проверьте{spaceMobile} {newLineMobile} папку Спам.
                    </span>
                </Card>
            </Content>
        </Layout>
    );
};
