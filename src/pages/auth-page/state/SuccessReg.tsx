import React from 'react';
import { Card, Layout } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import './State.css';
import { history } from '@redux/reducers/routerSlice.ts';
import { paths } from '@constants/constants.ts';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';

const { Content } = Layout;

export const SuccessReg: React.FC = () => {
    const handleClick = () => {
        history.push(paths.auth.path);
    };

    return (
        <Layout className={'wrapper-layout-state'}>
            <Content className={'wrapper-content-state'}>
                <Card className={'wrapper-card-state'}>
                    <CheckCircleFilled className={'icon-state status-success'} />
                    <h3 className={'title-state'}>Регистрация успешна</h3>
                    <span className={'message-state'}>
                        Регистрация прошла успешно. Зайдите&nbsp; <br /> в приложение, используя
                        свои e-mail и пароль.
                    </span>
                    <PrimaryButton
                        className={'button-state ant-btn-primary style'}
                        htmlType={'button'}
                        text={'Войти'}
                        onClick={handleClick}
                        dataTestId={'registration-enter-button'}
                    />
                </Card>
            </Content>
        </Layout>
    );
};
