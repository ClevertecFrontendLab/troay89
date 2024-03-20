import React from 'react';
import { Card, Layout } from 'antd';
import './State.css';
import { CloseCircleFilled } from '@ant-design/icons';
import { history } from '@redux/reducers/routerSlice.ts';
import { paths } from '@constants/constants.ts';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';

const { Content } = Layout;

export const GeneralRegistrationError: React.FC = () => {
    const handleClick = () => {
        history.push(paths.registration.path, { from: paths.errorRegistrationEmail.path });
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
                    <PrimaryButton
                        className={'button-state ant-btn-primary style'}
                        htmlType={'button'}
                        text={'Повторить'}
                        onClick={handleClick}
                        dataTestId={'registration-retry-button'}
                    />
                </Card>
            </Content>
        </Layout>
    );
};
