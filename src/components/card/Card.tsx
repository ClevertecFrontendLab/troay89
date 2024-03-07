import React, { ReactNode } from 'react';
import { Card } from 'antd';
import './Card.css';

type CardProps = {
    title: string;
    content: string;
    icon: ReactNode;
    isCloseSide: boolean;
    onClick: () => void;
};

export const CardComponent: React.FC<CardProps> = ({
    title,
    content,
    icon,
    isCloseSide,
    onClick,
}) => {
    const minWidthCard = isCloseSide ? 230 : 182;
    return (
        <Card className={'small-card-header'} title={title} style={{ minWidth: minWidthCard }}>
            <p onClick={onClick}>
                {icon} {content}
            </p>
        </Card>
    );
};
