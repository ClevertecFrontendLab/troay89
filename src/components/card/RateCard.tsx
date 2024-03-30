import { Card, Image } from 'antd';
import './RateCard.css';
import { CheckOutlined } from '@ant-design/icons';
import React from 'react';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';

type RateCard = {
    nameRate: string;
    img: string;
    isActive: boolean;
    setIsOpenDrawer(value: boolean): void;
    isDataTestId: boolean;
    date?: string;
};

export const RateCard: React.FC<RateCard> = ({
    nameRate,
    img,
    isActive,
    setIsOpenDrawer,
    date,
    isDataTestId,
}) => {
    const handleMore = () => {
        setIsOpenDrawer(true);
    };

    return (
        <Card className={'rate-card'} data-test-id={isDataTestId ? 'pro-tariff-card' : undefined}>
            <div className={'header-card'}>
                <span className={'name-rate'}>{nameRate}</span>
                <span className={'more-rate'} onClick={handleMore}>
                    Подробнее
                </span>
            </div>
            <Image src={img} alt={'picture'} />
            {isActive ? (
                <p className={`footer-card ${date && 'date'}`}>
                    активен{' '}
                    {date ? <span style={{ display: 'block' }}>до {date}</span> : <CheckOutlined />}
                </p>
            ) : (
                <div className={'wrapper-active-rate'}>
                    <PrimaryButton
                        className={'style active-rate'}
                        text={'Активировать'}
                        htmlType={'button'}
                        dataTestId={'activate-tariff-btn'}
                        onClick={handleMore}
                    />
                </div>
            )}
        </Card>
    );
};
