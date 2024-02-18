import React from 'react';
import { Button, Card, Layout } from 'antd';
import './State.css';
import { CloseCircleFilled } from '@ant-design/icons';

const { Content } = Layout;

export const GeneralRegistrationError: React.FC = () => (
    <Layout className={'wrapper-layout-state'}>
        <Content className={'wrapper-content-state'}>
            <Card className={'wrapper-card-state'}>
                <CloseCircleFilled className={'icon-state status-error'} />
                <h3 className={'title-state'}>Данные не сохранились</h3>
                <span className={'message-state'}>
                    Что-то пошло не так и ваша регистрация <br /> не завершилась. Попробуйте ещё
                    раз.
                </span>
                <Button className={'button-state'} type='primary' size={'large'}>
                    Повторить
                </Button>
            </Card>
        </Content>
    </Layout>
);
