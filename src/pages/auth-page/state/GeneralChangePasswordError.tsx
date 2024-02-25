import React from 'react';
import { Button, Card, Layout } from 'antd';
import './State.css';
import { CloseCircleFilled } from '@ant-design/icons';
import { history } from '@redux/reducers/routerSlice.ts';

const { Content } = Layout;

export const GeneralChangePasswordError: React.FC = () => {
    const handleClick = () => {
        history.push('/auth/change-password', { from: '/result/error-change-password' });
    };

    return (
        <Layout className={'wrapper-layout-state'}>
            <Content className={'wrapper-content-state'}>
                <Card className={'wrapper-card-state wrapper-error-change-passport'}>
                    <CloseCircleFilled className={'icon-state status-error'} />
                    <h3 className={'title-state'}>Данные не сохранились</h3>
                    <span className={'message-state'}>Что-то пошло не так. Попробуйте ещё раз</span>
                    <Button
                        className={'button-state'}
                        type='primary'
                        size={'large'}
                        onClick={handleClick}
                        data-test-id='change-retry-button'
                    >
                        Повторить
                    </Button>
                </Card>
            </Content>
        </Layout>
    );
};
