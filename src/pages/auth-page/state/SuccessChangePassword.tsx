import React from 'react';
import { Button, Card, Layout } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import './State.css';
import { history } from '@redux/reducers/routerSlice.ts';

const { Content } = Layout;

export const SuccessChangePassword: React.FC = () => {
    const handleClick = () => {
        history.push('/auth');
    };

    return (
        <Layout className={'wrapper-layout-state'}>
            <Content className={'wrapper-content-state'}>
                <Card className={'wrapper-card-state change-passport'}>
                    <CheckCircleFilled className={'icon-state status-success'} />
                    <h3 className={'title-state'}>Пароль успешно изменен</h3>
                    <span className={'message-state'}>
                        Теперь можно войти в аккаунт, используя <br />
                        свой логин и новый пароль
                    </span>
                    <Button
                        className={'button-state'}
                        type='primary'
                        size={'large'}
                        onClick={handleClick}
                    >
                        Вход
                    </Button>
                </Card>
            </Content>
        </Layout>
    );
};
