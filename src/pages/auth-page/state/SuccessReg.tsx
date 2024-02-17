import React from 'react';
import { Button, Card, Layout } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import './State.css';

const { Content } = Layout;

export const SuccessReg: React.FC = () => (
    <Layout className={'wrapper-layout-state'}>
        <Content className={'wrapper-content-state'}>
            <Card className={'wrapper-card-state'}>
                <CheckCircleFilled className={'icon-success'} />
                <h3 className={'title-state'}>Регистрация успешна</h3>
                <span className={'message-state'}>
                    Регистрация прошла успешно. Зайдите <br /> в приложение, используя свои e-mail и
                    пароль.
                </span>
                <Button className={'button-state'} type='primary' size={'large'}>
                    Войти
                </Button>
            </Card>
        </Content>
    </Layout>
);
