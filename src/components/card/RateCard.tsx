import { Card, Image } from 'antd';
import './RateCard.css';
import { CheckOutlined } from '@ant-design/icons';
import React from 'react';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';

type RateCard = {
    nameRate: string;
    img: string;
    isActive: boolean;
    date?: string;
    setIsOpenDrawer(value: boolean): void;
};

export const RateCard: React.FC<RateCard> = ({
    nameRate,
    img,
    isActive,
    setIsOpenDrawer,
    date,
}) => {
    const handleMore = () => {
        setIsOpenDrawer(true);
    };
    const activeText = (
        <span>
            <br /> до {date}
        </span>
    );

    return (
        <Card className={'rate-card'}>
            <div className={'header-card'}>
                <span className={'name-rate'}>{nameRate}</span>
                <span className={'more-rate'} onClick={handleMore}>
                    Подробнее
                </span>
            </div>
            <Image src={img} alt={'picture'} />
            {isActive ? (
                <p className={`footer-card ${date && 'date'}`}>
                    активен {date ? activeText : <CheckOutlined />}
                </p>
            ) : (
                <div className={'wrapper-active-rate'}>
                    <PrimaryButton
                        className={'style active-rate'}
                        text={'Активировать'}
                        htmlType={'button'}
                    />
                </div>
            )}
        </Card>
    );
};