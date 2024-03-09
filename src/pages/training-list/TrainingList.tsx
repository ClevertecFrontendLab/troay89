import { BadgeProps, ConfigProvider } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { LayoutComponent } from '@components/layout';
import ruRU from 'antd/lib/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';
import { TrainingModal } from '@components/modal/training-modal/TrainingModal.tsx';
import {
    useGetPersonalTrainingListQuery,
    useGetTrainingListQuery,
} from '@redux/reducers/apiSlice.ts';
import { Loader } from '@components/loader/Loader.tsx';
import { JVT_TOKEN, paths, statusCodes } from '@constants/constants.ts';
import { history } from '@redux/reducers/routerSlice.ts';
import { ErrorTrainingModal } from '@components/modal/error-list-training/ErrorTrainingModal.tsx';
import './TrainingList.css';

export type Position = {
    date: string;
    top: number;
    left?: number | undefined;
    right?: number | undefined;
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalErrorList, setIsModalErrorList] = useState(false);
    const [modalPosition, setModalPosition] = useState<Position | null>(null);
    const {
        data: dataTrainingList,
        isLoading: isLoadingTrainingList,
        error: errorTrainingList,
    } = useGetTrainingListQuery();
    const {
        data: dataPersonalTraining,
        isLoading: isLoadingPersonalTraining,
        error: errorPersonalTraining,
    } = useGetPersonalTrainingListQuery();

    useEffect(() => {
        if (dataTrainingList) {
            console.log(dataTrainingList);
            setIsModalErrorList(true);
        } else if (errorTrainingList) {
            if (
                'status' in errorTrainingList &&
                errorTrainingList.status === statusCodes.ERROR_403
            ) {
                localStorage.removeItem(JVT_TOKEN);
                sessionStorage.removeItem(JVT_TOKEN);
                history.push(paths.auth.path);
            } else {
                console.log(errorTrainingList);
            }
        }
    }, [dataTrainingList, errorTrainingList]);

    useEffect(() => {
        if (dataPersonalTraining) {
            console.log(dataPersonalTraining);
        } else if (errorPersonalTraining) {
            console.log(errorPersonalTraining);
        }
    }, [dataPersonalTraining, errorPersonalTraining]);

    if (isLoadingTrainingList || isLoadingPersonalTraining) {
        return <Loader />;
    }

    const monthCellRender = (value: Moment) => {
        const num = getMonthData(value);
        return num ? (
            <div className='notes-month'>
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const handleClickCell = (value: Moment, event: React.MouseEvent<HTMLElement>) => {
        const date = value.toDate().toLocaleDateString();
        const rect = event.currentTarget.getBoundingClientRect();
        const windowWidth = window.innerWidth / 1.4;
        if (rect.left > windowWidth) {
            setModalPosition({ top: rect.top, right: rect.right, date: date });
        } else {
            setModalPosition({ top: rect.top, left: rect.left, date: date });
        }
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
            <ErrorTrainingModal
                isModal={isModalErrorList}
                closeModal={() => setIsModalOpen(false)}
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
