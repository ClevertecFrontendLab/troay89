import { Switch, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';
import './ToolTipRite.css';

type ToolTipRiteProps = {
    text: string | React.ReactNode;
    title: React.ReactNode;
};

export const ToolTipRite: React.FC<ToolTipRiteProps> = ({ text, title }) => (
    <div className={'content-switch'}>
        <span className={'left-content'}>
            <span className={'text'}>{text}</span>
            <Tooltip title={title} placement='bottomLeft'>
                <ExclamationCircleOutlined />
            </Tooltip>
        </span>
        <Switch defaultChecked />
    </div>
);
