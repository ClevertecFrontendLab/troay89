import React from 'react';
import { Card, Layout } from 'antd';
import './State.css';
import { CloseCircleFilled } from '@ant-design/icons';
import { history } from '@redux/reducers/routerSlice.ts';
import { useMediaQuery } from 'react-responsive';
import { paths } from '@constants/constants.ts';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';

const { Content } = Layout;

export const EmailRegistrationError: React.FC = () => {
    const handleClick = () => {
        history.push(paths.registration.path);
    };
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    const newLine = isMobile ? '' : <br />;

    return (
        <Layout className={'wrapper-layout-state'}>
            <Content className={'wrapper-content-state'}>
                <Card className={'wrapper-card-state'}>
                    <CloseCircleFilled className={'icon-state status-error'} />
                    <h3 className={'title-state'}>Данные не сохранились</h3>
                    <span className={'message-state'}>
                        Такой e-mail уже записан в системе. Попробуйте {newLine} зарегистрироваться
                        по другому e-mail.
                    </span>
                    <PrimaryButton
                        className={'button-state ant-btn-primary style'}
                        htmlType={'button'}
                        text={'Назад к регистрации'}
                        onClick={handleClick}
                        dataTestId={'registration-back-button'}
                    />
                </Card>
            </Content>
        </Layout>
    );
};
