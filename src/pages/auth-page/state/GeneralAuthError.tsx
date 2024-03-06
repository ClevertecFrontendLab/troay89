import React from 'react';
import { Card, Layout } from 'antd';
import './State.css';
import { WarningFilled } from '@ant-design/icons';
import { history } from '@redux/reducers/routerSlice.ts';
import { paths } from '@constants/constants.ts';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';

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
                    <PrimaryButton
                        className={'button-state ant-btn-primary style'}
                        htmlType={'button'}
                        text={'Повторить'}
                        onClick={handleClick}
                        dataTestId={'login-retry-button'}
                    />
                </Card>
            </Content>
        </Layout>
    );
};
