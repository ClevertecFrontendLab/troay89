import React, { ReactNode } from 'react';
import { Button } from 'antd';
import './Buttons.css';

type DefaultButton = {
    className: string;
    text: string;
    icon: ReactNode | null;
    buttonKey?: string;
    onClick?: () => void;
    disabled?: boolean;
};

export const DefaultButton: React.FC<DefaultButton> = ({
    className,
    onClick,
    text,
    icon,
    buttonKey,
    disabled,
}) => {
    return (
        <Button
            className={className}
            icon={icon}
            onClick={onClick}
            size={'large'}
            key={buttonKey}
            disabled={disabled}
        >
            {text}
        </Button>
    );
};
