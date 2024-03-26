import { Card, Image } from 'antd';
import './RateCard.css';
import { CheckOutlined } from '@ant-design/icons';
import React from 'react';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';

type RateCard = {
    nameRate: string;
    img: string;
    isActive: boolean;
};

export const RateCard: React.FC<RateCard> = ({ nameRate, img, isActive }) => {
    return (
        <Card className={'rate-card'}>
            <div className={'header-card'}>
                <span className={'name-rate'}>{nameRate}</span>
                <span className={'more-rate'}>Подробнее</span>
            </div>
            <Image src={img} alt={'picture'} />
            {isActive ? (
                <p className={'footer-card'}>
                    активен <CheckOutlined />
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
