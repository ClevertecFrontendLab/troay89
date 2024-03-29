import React, { useEffect, useState } from 'react';
import { LayoutComponent } from '@components/layout';
import './Setting.css';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';
import { DefaultButton } from '@components/buttons/DefaultButton.tsx';
import { RateCard } from '@components/card/RateCard.tsx';
import { ToolTipRite } from '@components/tooltip/ToolTipRite.tsx';
import freeCard from '/img/png/free.png';
import proDisabled from '/img/png/pro_disabled.png';
import proActive from '/img/png/pro_active.png';
import {
    useChangeUserInfoMutation,
    useGetRateInfoQuery,
    useGetUserInfoQuery,
} from '@redux/reducers/apiSlice.ts';
import { RateDrawer } from '@components/draver/tariff-drawer/RateDrawer.tsx';
import { history } from '@redux/reducers/routerSlice.ts';
import { paths } from '@constants/constants.ts';
import { CommentModal } from '@components/modal/comment-modal/CommentModal.tsx';

const Setting: React.FC = () => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isOpenCommemt, setIsOpenCommemt] = useState(false);
    const [isDarkTopic, setIsDarkTopic] = useState(false);
    const [isReadyForJointTraining, setIsReadyForJointTraining] = useState(false);
    const [isSendNotification, setIsSendNotification] = useState(false);
    const { data } = useGetRateInfoQuery();
    const { data: dataInfo } = useGetUserInfoQuery();
    const [changeUserInfo, { data: dataEditUser }] = useChangeUserInfoMutation();

    useEffect(() => {
        if (dataInfo || dataEditUser) {
            setIsReadyForJointTraining(
                dataEditUser
                    ? (dataEditUser.readyForJointTraining as boolean)
                    : dataInfo
                    ? (dataInfo.readyForJointTraining as boolean)
                    : true,
            );
            setIsSendNotification(
                dataEditUser
                    ? (dataEditUser.sendNotification as boolean)
                    : dataInfo
                    ? (dataInfo.sendNotification as boolean)
                    : true,
            );
        }
    }, [dataEditUser, dataInfo]);

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

    const onchangeSwitch = (checked: boolean, id: string | React.ReactNode) => {
        if (id === 'Открыт для совместных тренировок') {
            changeUserInfo({ readyForJointTraining: checked });
        } else if (id === 'Уведомления') {
            changeUserInfo({ sendNotification: checked });
        } else {
            setIsDarkTopic(checked);
        }
    };

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
                            date={undefined}
                            setIsOpenDrawer={setIsOpenDrawer}
                        />
                        <RateCard
                            dataTestId={'pro-tariff-card'}
                            nameRate={'PRO tarif'}
                            img={dataInfo && dataInfo.tariff ? proActive : proDisabled}
                            isActive={!!(dataInfo && dataInfo.tariff)}
                            date={
                                dataInfo && dataInfo.tariff
                                    ? new Date(dataInfo.tariff.expired).toLocaleDateString(
                                          'default',
                                          { day: '2-digit', month: '2-digit' },
                                      )
                                    : undefined
                            }
                            setIsOpenDrawer={setIsOpenDrawer}
                        />
                    </div>
                    <div className={'wrapper-switch'}>
                        <ToolTipRite
                            dataTestId={'tariff-trainings'}
                            dataTestIdIcon={'tariff-trainings-icon'}
                            text={'Открыт для совместных тренировок'}
                            title={tooltipTitleOne}
                            isCheck={isReadyForJointTraining}
                            onSwitchChange={onchangeSwitch}
                        />
                        <ToolTipRite
                            dataTestIdIcon={'tariff-notifications-icon'}
                            dataTestId={'tariff-notifications'}
                            text={'Уведомления'}
                            title={tooltipTitleTwo}
                            isCheck={isSendNotification}
                            onSwitchChange={onchangeSwitch}
                        />
                        <ToolTipRite
                            dataTestIdIcon={'tariff-theme-icon'}
                            dataTestId={'tariff-theme'}
                            text={text}
                            title={tooltipTitleThree}
                            isCheck={isDarkTopic}
                            onSwitchChange={onchangeSwitch}
                            isDisabled={!(dataInfo && dataInfo.tariff)}
                        />
                    </div>
                    <div className={'wrapper-button'}>
                        <PrimaryButton
                            className={'style one-button'}
                            text={'Написать отзыв'}
                            htmlType={'submit'}
                            onClick={() => setIsOpenCommemt(true)}
                        />
                        <DefaultButton
                            className={'two-button'}
                            text={'Смотреть все отзывы'}
                            onClick={() => history.push(paths.feedbacks.path)}
                        />
                    </div>
                </div>
            </div>
            <RateDrawer
                isModal={isOpenDrawer}
                closeModal={() => setIsOpenDrawer(false)}
                dataTariff={data}
                date={
                    dataInfo && dataInfo.tariff
                        ? new Date(dataInfo.tariff.expired).toLocaleDateString('default', {
                              day: '2-digit',
                              month: '2-digit',
                          })
                        : undefined
                }
                email={dataInfo && dataInfo.email}
            />
            <CommentModal isModal={isOpenCommemt} closeModal={() => setIsOpenCommemt(false)} />
        </>
    );
};

export const SettingPage: React.FC = () => {
    return <LayoutComponent>{() => <Setting />}</LayoutComponent>;
};
