import React, { ReactNode } from 'react';
import { Card } from 'antd';
import './Card.css';

interface CardProps {
    title: string;
    content: string;
    icon: ReactNode;
    isCloseSide: boolean;
}

export const CardComponent: React.FC<CardProps> = ({ title, content, icon, isCloseSide }) => {
    const minWidthCard = isCloseSide ? 230 : 182;
    return (
        <Card className={'small-card-header'} title={title} style={{ minWidth: minWidthCard }}>
            <p>
                {icon} {content}
            </p>
        </Card>
    );
};
