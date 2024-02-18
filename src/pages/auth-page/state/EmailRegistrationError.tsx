import React from 'react';
import { Button, Card, Layout } from 'antd';
import './State.css';
import { CloseCircleFilled } from '@ant-design/icons';
import { history } from '@redux/reducers/routerSlice.ts';

const { Content } = Layout;

export const EmailRegistrationError: React.FC = () => {
    const handleClick = () => {
        history.push('/auth/ registration');
    };

    return (
        <Layout className={'wrapper-layout-state'}>
            <Content className={'wrapper-content-state'}>
                <Card className={'wrapper-card-state'}>
                    <CloseCircleFilled className={'icon-state status-error'} />
                    <h3 className={'title-state'}>Данные не сохранились</h3>
                    <span className={'message-state'}>
                        Такой e-mail уже записан в системе. Попробуйте <br /> зарегистрироваться по
                        другому e-mail.
                    </span>
                    <Button
                        className={'button-state'}
                        type='primary'
                        size={'large'}
                        onClick={handleClick}
                    >
                        Назад к регистрации
                    </Button>
                </Card>
            </Content>
        </Layout>
    );
};
