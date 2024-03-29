import React from 'react';
import { LayoutComponent } from '@components/layout';
import './Page404.css';
import { Result } from 'antd';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';
import { history } from '@redux/reducers/routerSlice.ts';
import { paths } from '@constants/constants.ts';

export const Page404: React.FC = () => {
    return (
        <LayoutComponent>
            {() => (
                <div className={'wrapper-404'}>
                    <Result
                        status='404'
                        title='Такой страницы нет'
                        subTitle='Извините, страница не найдена, возможно, возможно она была удалена или перемещена'
                        extra={
                            <PrimaryButton
                                className={'style-second'}
                                text={'На главную'}
                                htmlType={'button'}
                                onClick={() => history.push(paths.main.path)}
                            />
                        }
                    />
                </div>
            )}
        </LayoutComponent>
    );
};
