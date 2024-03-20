import React, {useEffect, useState} from 'react';
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
import { JVT_TOKEN, paths } from '@constants/constants.ts';
import { Loader } from '@components/loader/Loader.tsx';
import { ErrorModal } from '@components/modal/error-modal/ErrorModal.tsx';
import { usePersonalTrainingList } from '@hooks/personal-training-hook.ts';

type SiderProps = {
    isCloseSide: boolean;
    setIsCloseSide(value: boolean): void;
};

const { Sider } = Layout;

export const SiderComponent: React.FC<SiderProps> = ({ isCloseSide, setIsCloseSide }) => {
    const MenuIcon = isCloseSide ? MenuUnfoldOutlined : MenuFoldOutlined;
    const [selectedKey, setSelectedKey] = useState('0');
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
        localStorage.removeItem(JVT_TOKEN);
        sessionStorage.removeItem(JVT_TOKEN);
        history.push(paths.auth.path);
    };

    useEffect(() => {
        switch (location.pathname) {
            case paths.trainingList.path:
                setSelectedKey('1');
                break;
            default:
                setSelectedKey('0');
        }
    }, []);

    const { isOpenModal, handleClickCalendar, personalTrainingIsLoading, setIsOpenModal } =
        usePersonalTrainingList();

    if (personalTrainingIsLoading) {
        return <Loader />;
    }

    return (
        <>
            <ErrorModal isModal={isOpenModal} closeModal={() => setIsOpenModal(false)} />
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
                <Menu theme='light' className={'list-menu'} selectedKeys={[selectedKey]}>
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
        </>
    );
};
