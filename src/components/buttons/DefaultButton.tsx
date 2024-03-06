import React, { ReactNode } from 'react';
import { Button } from 'antd';
import './Buttons.css';

type DefaultButton = {
    className: string;
    text: string;
    icon: ReactNode | null;
    buttonKey?: string;
    onClick?: () => void;
};

export const DefaultButton: React.FC<DefaultButton> = ({
    className,
    onClick,
    text,
    icon,
    buttonKey,
}) => {
    return (
        <Button className={className} icon={icon} onClick={onClick} size={'large'} key={buttonKey}>
            {text}
        </Button>
    );
};
