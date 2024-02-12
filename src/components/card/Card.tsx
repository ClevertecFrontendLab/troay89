import React, {ReactNode} from "react";
import {Card} from 'antd';
import './Card.css';

interface CardProps {
    title: string;
    content: string;
    icon: ReactNode
}

export const CardComponent: React.FC<CardProps> = ({title, content, icon}) => (
    <Card className={'small-card-header'} title={title} style={{width: 240}}>
        <p>{icon} {content}</p>
    </Card>
);

