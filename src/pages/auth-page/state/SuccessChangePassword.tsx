import React from 'react';
import { Card, Layout } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import './State.css';
import { history } from '@redux/reducers/routerSlice.ts';
import { useMediaQuery } from 'react-responsive';
import { paths } from '@constants/constants.ts';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';

const { Content } = Layout;

export const SuccessChangePassword: React.FC = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    const spaceMobile = isMobile ? <>&nbsp;</> : '';
    const handleClick = () => {
        history.push(paths.auth.path);
    };

    return (
        <Layout className={'wrapper-layout-state'}>
            <Content className={'wrapper-content-state'}>
                <Card className={'wrapper-card-state change-passport'}>
                    <CheckCircleFilled
                        className={'icon-state status-success status-success-pass'}
                    />
                    <h3 className={'title-state title-success-pass'}>Пароль успешно изменен</h3>
                    <span className={'message-state'}>
                        Теперь можно войти в аккаунт, используя{spaceMobile} <br />
                        свой логин и новый пароль
                    </span>
                    <PrimaryButton
                        className={'button-state style'}
                        htmlType={'button'}
                        text={'Вход'}
                        onClick={handleClick}
                        dataTestId={'change-entry-button'}
                    />
                </Card>
            </Content>
        </Layout>
    );
};
