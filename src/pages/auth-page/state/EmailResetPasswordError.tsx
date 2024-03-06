import React from 'react';
import { Card, Layout } from 'antd';
import './State.css';
import { CloseCircleFilled } from '@ant-design/icons';
import { history } from '@redux/reducers/routerSlice.ts';
import { useMediaQuery } from 'react-responsive';
import { paths } from '@constants/constants.ts';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';

const { Content } = Layout;

export const EmailResetPasswordError: React.FC = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    const newLine = isMobile ? '' : <br />;

    const handleClick = () => {
        history.push(paths.auth.path);
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
                    <PrimaryButton
                        className={'button-state middle style'}
                        htmlType={'button'}
                        text={'Попробовать снова'}
                        onClick={handleClick}
                        dataTestId={'check-retry-button'}
                    />
                </Card>
            </Content>
        </Layout>
    );
};
