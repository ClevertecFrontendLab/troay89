import { BadgeProps, ConfigProvider } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Moment } from 'moment';
import React, { useState } from 'react';
import { LayoutComponent } from '@components/layout';
import ruRU from 'antd/lib/locale/ru_RU';
import './TrainingList.css';

import moment from 'moment';
import 'moment/locale/ru';
import { TrainingModal } from '@components/modal/training-modal/TrainingModal.tsx';

export type Position = {
    top: number;
    left: number;
};

moment.updateLocale('ru', {
    monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_'),
    weekdaysMin: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
    week: {
        dow: 1,
    },
});

const getListData = (value: Moment) => {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
            ];
            break;
        case 10:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
                { type: 'error', content: 'This is error event.' },
            ];
            break;
        case 15:
            listData = [
                { type: 'warning', content: 'This is warning event' },
                { type: 'success', content: 'This is very long usual event。。....' },
                { type: 'error', content: 'This is error event 1.' },
                { type: 'error', content: 'This is error event 2.' },
                { type: 'error', content: 'This is error event 3.' },
                { type: 'error', content: 'This is error event 4.' },
            ];
            break;
        default:
    }
    return listData || [];
};

const getMonthData = (value: Moment) => {
    if (value.month() === 8) {
        return 1394;
    }
};

const TrainingCalendar: React.FC = () => {
    const monthCellRender = (value: Moment) => {
        const num = getMonthData(value);
        return num ? (
            <div className='notes-month'>
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState<Position | null>(null);

    const handleClickCell = (value: Moment, event: React.MouseEvent<HTMLElement>) => {
        console.log(value);
        const rect = event.currentTarget.getBoundingClientRect();
        setModalPosition({ top: rect.top, left: rect.left });
        setIsModalOpen(true);
    };

    const dateCellRender = (value: Moment) => {
        const listData = getListData(value);
        return (
            <div className={'wrapper-events'} onClick={(event) => handleClickCell(value, event)}>
                <ul className='events'>
                    {listData.map((item, index) => (
                        <li key={index} onClick={(event) => handleClickCell(value, event)}>
                            <Badge status={item.type as BadgeProps['status']} text={item.content} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className={'wrapper-calendar'}>
            <Calendar
                className={'custom-calendar'}
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender}
            />
            <TrainingModal
                isModal={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                modalPosition={modalPosition}
            />
        </div>
    );
};

export const TrainingList: React.FC = () => {
    return (
        <LayoutComponent>
            {() => (
                <ConfigProvider locale={ruRU}>
                    <TrainingCalendar />
                </ConfigProvider>
            )}
        </LayoutComponent>
    );
};
