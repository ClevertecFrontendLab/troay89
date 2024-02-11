import React from 'react';
import { Layout, Menu} from 'antd';
import {
    CalendarTwoTone,
    HeartFilled,
    IdcardOutlined, MenuFoldOutlined, MenuUnfoldOutlined, TrophyFilled,
} from '@ant-design/icons';
import logo from '../../../public/img/svg/logo.svg';
import styles from './Sider.module.css';

interface SiderI {
    isCloseSide: boolean;
    setIsCloseSide(value: boolean): void;
}

const { Sider } = Layout;

export const SiderComponent: React.FC<SiderI> = ({ isCloseSide, setIsCloseSide }) => {
    return (
        <Sider width={208} trigger={false} theme={'light'} collapsible collapsed={isCloseSide} className={styles.sider}>
            <img className={styles.logo} src={logo} alt={'logo company'} />
            <Menu selectable={false} theme='light' triggerSubMenuAction={'click'} className={styles['list-menu']}>
                <Menu.Item key='1' icon={<CalendarTwoTone className={styles['svg-menu']}/>} className={styles['ant-menu-item']}>
                    Календарь
                </Menu.Item>
                <Menu.Item key='2' icon={<HeartFilled className={styles['svg-menu']}/>} className={styles['ant-menu-item']}>
                    Тренировки
                </Menu.Item>
                <Menu.Item key='3' icon={<TrophyFilled className={styles['svg-menu']}/>} className={styles['ant-menu-item']}>
                    Достижения
                </Menu.Item>
                <Menu.Item key='4' icon={<IdcardOutlined className={styles['svg-menu-special']}/>} className={styles['ant-menu-item']}>
                    Профиль
                </Menu.Item>
            </Menu>
            {React.createElement(isCloseSide ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setIsCloseSide(!isCloseSide),
            })}
        </Sider>
    );
};
