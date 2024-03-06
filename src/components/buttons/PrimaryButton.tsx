import { Button } from 'antd';
import React from 'react';
import './Buttons.css';

type PrimaryButtonProps = {
    className: string;
    text: string;
    htmlType: 'button' | 'submit';
    disabled?: boolean;
    dataTestId?: string;
    buttonKey?: string;
    onClick?: () => void;
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    className,
    text,
    htmlType,
    disabled,
    buttonKey,
    dataTestId,
    onClick,
}) => {
    return (
        <Button
            className={className}
            data-test-id={dataTestId}
            htmlType={htmlType}
            type='primary'
            disabled={disabled}
            onClick={onClick}
            size={'large'}
            key={buttonKey}
        >
            {text}
        </Button>
    );
};
