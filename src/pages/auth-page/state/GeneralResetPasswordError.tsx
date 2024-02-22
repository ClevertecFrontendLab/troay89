import { Button, Card, Image, Layout } from 'antd';
import React from 'react';
import { history } from '@redux/reducers/routerSlice.ts';
import somethingWrong from '/img/svg/something-wrong.svg';

const { Content } = Layout;

export const GeneralResetPasswordError: React.FC = () => {
    const handleClick = () => {
        history.push('/auth', { from: '/auth/confirm-email' });
    };

    return (
        <Layout className={'wrapper-layout-state'}>
            <Content className={'wrapper-content-state'}>
                <Card className={'wrapper-card-state wrapper-general-email'}>
                    <Image
                        className={'icon-state large'}
                        src={somethingWrong}
                        alt={'something wrong'}
                    />
                    <h3 className={'title-state'}>Что-то пошло не так</h3>
                    <span className={'message-state'}>
                        Произошла ошибка, попробуйте отправить форму ещё раз
                    </span>
                    <Button
                        className={'button-state small'}
                        type='primary'
                        size={'large'}
                        onClick={handleClick}
                    >
                        назад
                    </Button>
                </Card>
            </Content>
        </Layout>
    );
};
