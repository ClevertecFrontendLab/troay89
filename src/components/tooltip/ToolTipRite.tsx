import { Switch, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';
import './ToolTipRite.css';
import { useMediaQuery } from 'react-responsive';

type ToolTipRiteProps = {
    text: string | React.ReactNode;
    title: React.ReactNode;
    isCheck: boolean;
    onSwitchChange: (checked: boolean, id: string | React.ReactNode) => void;
    isDisabled?: boolean;
};

export const ToolTipRite: React.FC<ToolTipRiteProps> = ({
    text,
    title,
    isCheck,
    onSwitchChange,
    isDisabled = false,
}) => {
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    return (
        <div className={'content-switch'}>
            <span className={'left-content'}>
                <span className={`text ${isDisabled && 'disabled'}`}>{text}</span>
                <Tooltip title={title} placement={isMobile ? 'topLeft' : 'bottomLeft'}>
                    <ExclamationCircleOutlined />
                </Tooltip>
            </span>
            <Switch
                size={isMobile ? 'small' : undefined}
                checked={isCheck}
                onChange={(checked) => onSwitchChange(checked, text)}
                disabled={isDisabled}
            />
        </div>
    );
};
