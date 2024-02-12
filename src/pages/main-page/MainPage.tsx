import React from "react";
import {Layout} from "antd";
import {Card} from 'antd';
import {CardComponent} from "@components/card/Card.tsx";
import {
    AndroidFilled,
    AppleFilled,
    CalendarTwoTone,
    HeartFilled,
    IdcardOutlined
} from "@ant-design/icons";
import './MainPage.css'

const {Content} = Layout;

export const MainPage: React.FC = () => {
    return (
        <Content className='site-layout-background'>
            <Card className={'main-card-about'} style={{width: 752}}>
                <p>С CleverFit ты сможешь: <br/>
                    — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;<br/>
                    — отслеживать свои достижения в разделе статистики, сравнивая свои
                    результаты<br/>
                    с нормами и рекордами;<br/>
                    — создавать свой профиль, где ты можешь загружать свои фото, видео и
                    отзывы <br/>
                    о тренировках;<br/>
                    — выполнять расписанные тренировки для разных частей тела, следуя
                    подробным <br/>
                    инструкциям и советам профессиональных тренеров.</p>
            </Card>
            <Card className={'main-card-tagline'} style={{width: 752}}>
                <h4>CleverFit — это не просто приложение, а твой личный помощник <br/> в мире
                    фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!</h4>
            </Card>
            <div className={'small-cards'}>
                <CardComponent title={'Расписать тренировки'} content={'Тренировки'}
                               icon={<HeartFilled/>}/>
                <CardComponent title={'Назначить календарь'} content={'Календарь'}
                               icon={<CalendarTwoTone twoToneColor={'#2F54EB'}/>}/>
                <CardComponent title={'Заполнить профиль'} content={'Профиль'}
                               icon={<IdcardOutlined/>}/>
            </div>
            <Card className={'contact-card-header'} bordered={false} style={{width: 240}}>
                <p className={'contact-card-header-first-title'}>Скачать на телефон</p>
                <p className={'contact-card-header-second-title'}>Доступно в PRO-тарифе</p>
                <div className={'bord-contact-card'}></div>
                <p className={'icon-contact-card'}><span className={'container-icon-contact-card'}>{
                    <AndroidFilled/>} <span>Android OS</span> {<AppleFilled/>}
                    <span>Apple iOS</span></span></p>
            </Card>
        </Content>
    );
};
