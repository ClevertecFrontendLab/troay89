import React, {useEffect, useState} from 'react';
import {Typography, Layout} from 'antd';
import {SettingOutlined} from '@ant-design/icons';
import './AppHeader.css';
import {useMediaQuery} from "react-responsive";

const {Title, Paragraph} = Typography;
const {Header} = Layout;

interface AppHeaderProps {
    isCloseSide: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ isCloseSide }) => {
const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' });
const [showIcon, setShowIcon] = useState(true);

    useEffect(() => {
        setShowIcon(!(isCloseSide && isTabletOrMobile));
    }, [isCloseSide, isTabletOrMobile]);

    return (
    <Header className={'ant-layout-header'} style={{padding: 0}}>
        <div className={'block-welcome'}>
            <Paragraph className={'type-page'}>Главная</Paragraph>
            <Title className={'title-header'}>
                Приветствуем тебя в CleverFit — приложении, <br /> которое поможет тебе добиться своей
                мечты!
            </Title>
        </div>
        <Paragraph className={'header-seating'}>
            {showIcon ? <SettingOutlined/> : ''}
            Настройки
        </Paragraph>
    </Header>
    )
};

