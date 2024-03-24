import React from 'react';
import { LayoutComponent } from '@components/layout';
import './Setting.css';

const Setting: React.FC = () => {
    return <div className={'wrapper-setting-page'}></div>;
};

export const SettingPage: React.FC = () => {
    return <LayoutComponent>{() => <Setting />}</LayoutComponent>;
};
