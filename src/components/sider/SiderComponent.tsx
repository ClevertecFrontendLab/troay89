import React from 'react';
import {Layout, Menu} from 'antd';
import {
    CalendarTwoTone,
    HeartFilled,
    IdcardOutlined, MenuFoldOutlined, MenuUnfoldOutlined, TrophyFilled,
} from '@ant-design/icons';
import logo from '../../../public/img/svg/logo.svg';
import partLogo from '../../../public/img/svg/logo-part.svg';
import './Sider.css'
import ExitBottom from "@components/custom-svg/ExitSVG.tsx";

interface SiderI {
    isCloseSide: boolean;
    setIsCloseSide(value: boolean): void;
}

const {Sider} = Layout;

export const SiderComponent: React.FC<SiderI> = ({isCloseSide, setIsCloseSide}) => {
    return (
        <Sider width={208} collapsedWidth={64} trigger={false} theme={'light'}
               collapsed={isCloseSide} className={'sider'}>
            <img className={isCloseSide ? 'logo small' : 'logo'} src={isCloseSide ? partLogo: logo} alt={'logo company'}/>
            <Menu selectable={false} theme='light' triggerSubMenuAction={'click'}
                  className={'list-menu'}>
                <Menu.Item key='1' icon={<CalendarTwoTone className={'svg-menu'}/>}
                           className={'ant-menu-item'}>
                    Календарь
                </Menu.Item>
                <Menu.Item key='2' icon={<HeartFilled className={'svg-menu'}/>}
                           className={'ant-menu-item'}>
                    Тренировки
                </Menu.Item>
                <Menu.Item key='3' icon={<TrophyFilled className={'svg-menu'}/>}
                           className={'ant-menu-item'}>
                    Достижения
                </Menu.Item>
                <Menu.Item key='4' icon={<IdcardOutlined className={'svg-menu-special'}/>}
                           className={'ant-menu-item'}>
                    Профиль
                </Menu.Item>
                <Menu.Item key='5' icon={<ExitBottom className={'svg-menu-exit'}/>} className={'ant-menu-item bord-exit'}>
                    Выход
                </Menu.Item>
            </Menu>
            <div className={'wrapper-trigger'} style={{
                left: isCloseSide ? 64 : 208,
                transition: 'left 0.23s cubic-bezier(0.2, 0, 0, 1) 0s'
            }}>
                {React.createElement(isCloseSide ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => setIsCloseSide(!isCloseSide),
                })}
            </div>
        </Sider>
    );
};

// #F0F0F0
