import React, {useEffect, useState} from 'react';
import {Card, Image, Layout,} from 'antd';
import logoAuth from '/img/svg/logo-auth.svg';
import {history} from '@redux/reducers/routerSlice.ts';
import {useLocation} from 'react-router-dom';
import {AuthComponent} from "@pages/auth-page/components/AuthComponent.tsx";
import {RegistrationComponent} from "@pages/auth-page/components/RegistrationComponent.tsx";
import {Loader} from "@components/loader/Loader.tsx";
import './Enter.css';

const tabList = [
    {
        key: 'tab1',
        tab: 'Вход',
    },
    {
        key: 'tab2',
        tab: 'Регистрация',
    },
];


const {Content} = Layout;

export const Enter: React.FC = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [activeTabKey1, setActiveTabKey1] = useState<string>(
        location.pathname === '/auth/registration' ? 'tab2' : 'tab1',
    );

    const contentList: Record<string, React.ReactNode> = {
        tab1: (<AuthComponent/>),
        tab2: (<RegistrationComponent setIsLoading={setIsLoading}/>),
    };


    useEffect(() => {
        setActiveTabKey1(location.pathname === '/auth/registration' ? 'tab2' : 'tab1');
    }, [location]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Tab') {
                setActiveTabKey1((prevKey) => {
                    const newKey = prevKey === 'tab1' ? 'tab2' : 'tab1';
                    if (newKey === 'tab1') {
                        history.push('/auth');
                    } else if (newKey === 'tab2') {
                        history.push('/auth/registration');
                    }
                    return newKey;
                });
                event.preventDefault();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const onTabChange = (key: string) => {
        setActiveTabKey1(key);
        if (key === 'tab1') {
            history.push('/auth');
        } else if (key === 'tab2') {
            history.push('/auth/registration');
        }
    };

    return (
        <Layout className={'auth-layout'}>
            {isLoading && <Loader/>}
            <Content className={'container-auth'}>
                <Card
                    bordered={false}
                    className={`auth-card ${activeTabKey1 === 'tab2' ? 'reg-card' : ''}`}
                    title={<Image src={logoAuth} alt={'logo for auth'} className={'logo-auth'}/>}
                    tabList={tabList}
                    activeTabKey={activeTabKey1}
                    onTabChange={onTabChange}
                >
                    {contentList[activeTabKey1]}
                </Card>
            </Content>
        </Layout>
    );
};

// maraphon2024front
