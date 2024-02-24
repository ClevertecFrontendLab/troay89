import React from 'react';
import { Button, Card, Layout } from 'antd';
import './State.css';
import { CloseCircleFilled } from '@ant-design/icons';
import { history } from '@redux/reducers/routerSlice.ts';
import { useMediaQuery } from 'react-responsive';

const { Content } = Layout;

export const EmailResetPasswordError: React.FC = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    const newLine = isMobile ? '' : <br />;

    const handleClick = () => {
        history.push('/auth');
    };

    return (
        <Layout className={'wrapper-layout-state'}>
            <Content className={'wrapper-content-state'}>
                <Card className={'wrapper-card-state wrapper-error-reset-email'}>
                    <CloseCircleFilled className={'icon-state status-error'} />
                    <h3 className={'title-state title-email-reset'}>
                        Такой e-mail не зарегистрирован
                    </h3>
                    <span className={'message-state'}>
                        Мы не нашли в базе вашего e-mail. Попробуйте&nbsp; {newLine}войти с другим
                        e-mail.
                    </span>
                    <Button
                        className={'button-state middle'}
                        type='primary'
                        size={'large'}
                        onClick={handleClick}
                    >
                        Попробовать снова
                    </Button>
                </Card>
            </Content>
        </Layout>
    );
};
