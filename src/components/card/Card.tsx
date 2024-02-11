import React, { ReactNode} from "react";
import { Card } from 'antd';
import './Card.css'

interface CardComponentI {
    title: string;
    content: string;
    icon: ReactNode
}

export const CardComponent: React.FC<CardComponentI> = ({title, content, icon}) => {
    return (
        <Card className={'small-card-header'} title={ title } style={{ width: 240 }}>
            <p>{ icon } { content }</p>
        </Card>
    );
};
