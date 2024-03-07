import React from 'react';
import { Layout, Menu } from 'antd';
import {
    CalendarTwoTone,
    HeartFilled,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import logo from '/img/svg/logo.svg';
import logoMobile from '/img/svg/logo-mobile.svg';
import partLogo from '/img/svg/logo-part.svg';

import ExitBottom from '@components/custom-svg/ExitSVG.tsx';
import './Sider.css';
import { useMediaQuery } from 'react-responsive';
import { history } from '@redux/reducers/routerSlice.ts';
import { paths } from '@constants/constants.ts';

type SiderProps = {
    isCloseSide: boolean;
    setIsCloseSide(value: boolean): void;
};

const { Sider } = Layout;

export const SiderComponent: React.FC<SiderProps> = ({ isCloseSide, setIsCloseSide }) => {
    const MenuIcon = isCloseSide ? MenuUnfoldOutlined : MenuFoldOutlined;
    const isMobile = useMediaQuery({ query: '(max-width: 815px)' });
    const sizeOpenSider = isMobile ? 106 : 208;
    const sizeCloseSider = isMobile ? 1 : 64;

    let logoSrc;
    if (isMobile) {
        logoSrc = logoMobile;
    } else {
        logoSrc = isCloseSide ? partLogo : logo;
    }

    const handleClickExit = () => {
        localStorage.removeItem('jwtToken');
        sessionStorage.removeItem('jwtToken');
        history.push(paths.auth.path);
    };

    const handleClickCalendar = () => {
        history.push(paths.trainingList.path);
    };

    return (
        <Sider
            width={sizeOpenSider}
            collapsedWidth={sizeCloseSider}
            trigger={false}
            theme={'light'}
            collapsed={isCloseSide}
            className={'sider'}
            data-test-id={isMobile ? 'sider-switch-mobile' : 'sider-switch'}
        >
            <div className={'logo-container'}>
                <img
                    className={`logo ${isCloseSide ? 'small' : ''}`}
                    src={logoSrc}
                    alt={'logo company'}
                />
            </div>
            <Menu
                selectable={false}
                theme='light'
                triggerSubMenuAction={'click'}
                className={'list-menu'}
            >
                <Menu.Item
                    key='1'
                    icon={isMobile ? null : <CalendarTwoTone className={'svg-menu'} />}
                    className={'ant-menu-item'}
                    onClick={handleClickCalendar}
                >
                    Календарь
                </Menu.Item>
                <Menu.Item
                    key='2'
                    icon={isMobile ? null : <HeartFilled className={'svg-menu'} />}
                    className={'ant-menu-item'}
                >
                    Тренировки
                </Menu.Item>
                <Menu.Item
                    key='3'
                    icon={isMobile ? null : <TrophyFilled className={'svg-menu'} />}
                    className={'ant-menu-item'}
                >
                    Достижения
                </Menu.Item>
                <Menu.Item
                    key='4'
                    icon={isMobile ? null : <IdcardOutlined className={'svg-menu-special'} />}
                    className={'ant-menu-item'}
                >
                    Профиль
                </Menu.Item>
                <Menu.Item
                    key='5'
                    icon={isMobile ? null : <ExitBottom className={'svg-menu-exit'} />}
                    className={'ant-menu-item bord-exit'}
                    onClick={handleClickExit}
                >
                    Выход
                </Menu.Item>
            </Menu>
            <div
                onClick={() => setIsCloseSide(!isCloseSide)}
                className={'wrapper-trigger'}
                style={{
                    left: isCloseSide ? sizeCloseSider : sizeOpenSider,
                    transition: 'left 0.23s cubic-bezier(0.2, 0, 0, 1) 0s',
                }}
            >
                {React.createElement(MenuIcon, {
                    className: 'trigger',
                })}
            </div>
        </Sider>
    );
};
