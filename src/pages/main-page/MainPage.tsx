import React from "react";
import {Layout} from "antd";
import {Card} from 'antd';
import {CardComponent} from "@components/card/Card.tsx";
import {
    CalendarTwoTone,
    HeartFilled,
    IdcardOutlined
} from "@ant-design/icons";
import './MainPage.css'
import {useMediaQuery} from "react-responsive";

const {Content} = Layout;

interface MainPageProps {
    isCloseSide: boolean;
}

export const MainPage: React.FC<MainPageProps> = ({isCloseSide}) => {
    const spaceTableSider = isCloseSide ? '' : <span className={'transfer-table'}></span>
    const spaceTableDefault = !isCloseSide ? '' : <span className={'transfer-table'}></span>
    const isMobile = useMediaQuery({query: '(max-width: 815px)'});
    const spaceMobile = !isMobile ? '' : <span className={'transfer-mobile'}></span>

    return (
        <Content className='site-layout-background'>
            <Card className={'main-card-about'}>
                <p>С CleverFit ты сможешь: <br/>
                    — планировать свои тренировки {spaceMobile} на календаре, выбирая тип
                    {<span>{spaceTableSider}{spaceTableSider}</span>}{spaceMobile} {spaceMobile} {spaceMobile}
                    {spaceMobile} и уровень нагрузки;<br/>
                    — отслеживать свои достижения {spaceMobile}  в разделе статистики, сравнивая свои
                    результаты с нормами {spaceMobile} {spaceMobile} {spaceMobile} и рекордами;<br/>
                    — создавать свой профиль, где {spaceMobile} ты можешь загружать свои фото, видео и
                    отзывы {spaceTableDefault} <span className={'transfer'}></span> о тренировках;<br/>
                    — выполнять расписанные тренировки для разных частей тела, следуя
                    подробным инструкциям {spaceMobile} и советам профессиональных тренеров.</p>
            </Card>
            <Card className={'main-card-tagline'}>
                <h4>CleverFit — это не просто приложение, а твой {spaceTableSider}
                    личный помощник<span className={'transfer'}></span> {spaceTableDefault}в мире фитнеса.
                    Не откладывай на завтра — начни тренироваться уже сегодня!</h4>
            </Card>
            <div className={'small-cards'}>
                <CardComponent title={'Расписать тренировки'} content={'Тренировки'}
                               icon={<HeartFilled/>} isCloseSide={isCloseSide}/>
                <CardComponent title={'Назначить календарь'} content={'Календарь'}
                               icon={<CalendarTwoTone twoToneColor={'#2F54EB'}/>} isCloseSide={isCloseSide}/>
                <CardComponent title={'Заполнить профиль'} content={'Профиль'}
                               icon={<IdcardOutlined/>} isCloseSide={isCloseSide}/>
            </div>
        </Content>
    );
}
