import React, { useEffect, useState } from 'react';
import { LayoutComponent } from '@components/layout';
import './Setting.css';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';
import { DefaultButton } from '@components/buttons/DefaultButton.tsx';
import { RateCard } from '@components/card/RateCard.tsx';
import { ToolTipRite } from '@components/tooltip/ToolTipRite.tsx';
import freeCard from '/img/png/free.png';
import proDisabled from '/img/png/pro_disabled.png';
import { useGetRateInfoQuery } from '@redux/reducers/apiSlice.ts';
import { RateDrawer } from '@components/draver/tariff-drawer/RateDrawer.tsx';

const Setting: React.FC = () => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const { data, isLoading, error } = useGetRateInfoQuery();

    useEffect(() => {
        if (data) {
            console.log(data);
        } else if (error) {
            console.log(error);
        } else if (isLoading) {
            console.log(isLoading);
        }
    }, [data, error, isLoading]);

    const tooltipTitleOne = (
        <span>
            включеная функция <br /> позволит участвовать <br /> в совместных тренировках
        </span>
    );
    const tooltipTitleTwo = (
        <span>
            включеная функция <br /> позволит получать <br /> уведомления об активностях
        </span>
    );
    const tooltipTitleThree = (
        <span>
            темная тема <br /> доступна для <br />
            PRO tarif
        </span>
    );
    const text = <span>Тёмная тема&nbsp;</span>;

    return (
        <>
            <div className={'wrapper-setting-page'}>
                <div className={'wrapper-setting-content'}>
                    <h4 className={'title'}>Мой тариф</h4>
                    <div className={'wrapper-card'}>
                        <RateCard
                            nameRate={'FREE tarif'}
                            img={freeCard}
                            isActive={true}
                            setIsOpenDrawer={setIsOpenDrawer}
                        />
                        <RateCard
                            nameRate={'PRO tarif'}
                            img={proDisabled}
                            isActive={false}
                            setIsOpenDrawer={setIsOpenDrawer}
                        />
                    </div>
                    <div className={'wrapper-switch'}>
                        <ToolTipRite
                            text={'Открыт для совместных тренировок'}
                            title={tooltipTitleOne}
                        />
                        <ToolTipRite text={'Уведомления'} title={tooltipTitleTwo} />
                        <ToolTipRite text={text} title={tooltipTitleThree} />
                    </div>
                    <div className={'wrapper-button'}>
                        <PrimaryButton
                            className={'style one-button'}
                            text={'Написать отзыв'}
                            htmlType={'submit'}
                        />
                        <DefaultButton className={'two-button'} text={'Смотреть все отзывы'} />
                    </div>
                </div>
            </div>
            <RateDrawer isModal={isOpenDrawer} closeModal={() => setIsOpenDrawer(false)} />
        </>
    );
};

export const SettingPage: React.FC = () => {
    return <LayoutComponent>{() => <Setting />}</LayoutComponent>;
};
