import React from 'react';
import { Button, Card, Layout } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import './State.css';
import { history } from '@redux/reducers/routerSlice.ts';

const { Content } = Layout;

export const SuccessReg: React.FC = () => {
    const handleClick = () => {
        history.push('/auth');
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
                    <Button
                        className={'button-state'}
                        type='primary'
                        size={'large'}
                        onClick={handleClick}
                        data-test-id='registration-enter-button'
                    >
                        Войти
                    </Button>
                </Card>
            </Content>
        </Layout>
    );
};
