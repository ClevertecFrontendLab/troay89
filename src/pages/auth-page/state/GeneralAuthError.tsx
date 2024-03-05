import React from 'react';
import { Button, Card, Layout } from 'antd';
import './State.css';
import { WarningFilled } from '@ant-design/icons';
import { history } from '@redux/reducers/routerSlice.ts';
import { paths } from '@constants/constants.ts';

const { Content } = Layout;

export const GeneralAuthError: React.FC = () => {
    const handleClick = () => {
        history.push(paths.auth.path);
    };

    return (
        <Layout className={'wrapper-layout-state'}>
            <Content className={'wrapper-content-state'}>
                <Card className={'wrapper-card-state wrapper-warning'}>
                    <WarningFilled className={'icon-state status-warning'} />
                    <h3 className={'title-state'}>Вход не выполнен</h3>
                    <span className={'message-state'}>
                        &nbsp;Что-то пошло не так. Попробуйте ещё раз.
                    </span>
                    <Button
                        className={'button-state'}
                        type='primary'
                        size={'large'}
                        onClick={handleClick}
                        data-test-id='login-retry-button'
                    >
                        Повторить
                    </Button>
                </Card>
            </Content>
        </Layout>
    );
};
