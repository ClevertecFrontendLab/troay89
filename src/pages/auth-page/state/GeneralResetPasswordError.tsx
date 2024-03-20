import { Card, Image, Layout } from 'antd';
import React from 'react';
import { history } from '@redux/reducers/routerSlice.ts';
import somethingWrong from '/img/svg/something-wrong.svg';
import { useMediaQuery } from 'react-responsive';
import { paths } from '@constants/constants.ts';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';

const { Content } = Layout;

export const GeneralResetPasswordError: React.FC = () => {
    const handleClick = () => {
        history.push(paths.auth.path, { from: paths.errorResetEmail.path });
    };
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    const newLine = isMobile ? <br /> : '';

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
                    <span className={'message-state general-change-pass'}>
                        Произошла ошибка, попробуйте {newLine} отправить форму ещё раз&nbsp;
                    </span>
                    <PrimaryButton
                        className={'button-state small style'}
                        htmlType={'button'}
                        text={'Назад'}
                        onClick={handleClick}
                        dataTestId={'check-back-button'}
                    />
                </Card>
            </Content>
        </Layout>
    );
};
