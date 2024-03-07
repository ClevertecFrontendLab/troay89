import { BadgeProps, ConfigProvider } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Moment } from 'moment';
import React from 'react';
import { LayoutComponent } from '@components/layout';
import ruRU from 'antd/lib/locale/ru_RU';
import './TrainingList.css';

import moment from 'moment';
import 'moment/locale/ru';

moment.updateLocale('ru', {
    monthsShort: 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
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

const MainContent: React.FC = () => {
    const monthCellRender = (value: Moment) => {
        const num = getMonthData(value);
        return num ? (
            <div className='notes-month'>
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value: Moment) => {
        const listData = getListData(value);
        return (
            <ul className='events'>
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type as BadgeProps['status']} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className={'wrapper-calendar'}>
            <Calendar
                className={'custom-calendar'}
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender}
            />
        </div>
    );
};

export const TrainingList: React.FC = () => {
    return (
        <LayoutComponent>
            {() => (
                <ConfigProvider locale={ruRU}>
                    <MainContent />
                </ConfigProvider>
            )}
        </LayoutComponent>
    );
};
