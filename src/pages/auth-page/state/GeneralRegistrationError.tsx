import React from 'react';
import { Button, Card, Layout } from 'antd';
import './State.css';
import { CloseCircleFilled } from '@ant-design/icons';
import { history } from '@redux/reducers/routerSlice.ts';

const { Content } = Layout;

export const GeneralRegistrationError: React.FC = () => {
    const handleClick = () => {
        history.push('/auth/registration', { from: '/result/error-user-exist' });
    };

    return (
        <Layout className={'wrapper-layout-state'}>
            <Content className={'wrapper-content-state'}>
                <Card className={'wrapper-card-state wrapper-general-reg'}>
                    <CloseCircleFilled className={'icon-state status-error'} />
                    <h3 className={'title-state'}>Данные не сохранились</h3>
                    <span className={'message-state'}>
                        Что-то пошло не так и ваша регистрация&nbsp; <br /> не завершилась.
                        Попробуйте ещё раз.
                    </span>
                    <Button
                        className={'button-state'}
                        type='primary'
                        size={'large'}
                        onClick={handleClick}
                    >
                        Повторить
                    </Button>
                </Card>
            </Content>
        </Layout>
    );
};
