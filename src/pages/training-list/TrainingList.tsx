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
    useLazyGetTrainingListQuery,
} from '@redux/reducers/apiSlice.ts';
import { Loader } from '@components/loader/Loader.tsx';
import { JVT_TOKEN, paths, statusCodes } from '@constants/constants.ts';
import { history } from '@redux/reducers/routerSlice.ts';
import { ErrorTrainingModal } from '@components/modal/error-list-training/ErrorTrainingModal.tsx';
import './TrainingList.css';
import { CreateTrainingModal } from '@components/modal/create-training-modal/CreateTrainingModal.tsx';
import { TrainingDraver } from '@components/draver/TrainingDraver.tsx';

export type Position = {
    date: string;
    top: number;
    disabled: boolean;
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

const TrainingCalendar: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(moment());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDraver, setIsModalOpenDraver] = useState(false);
    const [isModalAddTraining, setIsModalAddTraining] = useState(false);
    const [isModalErrorList, setIsModalErrorList] = useState(false);
    const [selectTraining, setSelectTraining] = useState('');
    const [dateClick, setDateClick] = useState('');
    const [modalPosition, setModalPosition] = useState<Position | null>(null);
    const [
        getPersonalTrainingList,
        { data: dataTrainingList, isLoading: isLoadingTrainingList, error: errorTrainingList },
    ] = useLazyGetTrainingListQuery();
    const {
        data: dataPersonalTraining,
        isLoading: isLoadingPersonalTraining,
        error: errorPersonalTraining,
    } = useGetPersonalTrainingListQuery();

    useEffect(() => {
        if (!isModalErrorList) {
            getPersonalTrainingList();
        }
    }, [getPersonalTrainingList, isModalErrorList]);

    useEffect(() => {
        if (dataTrainingList) {
            console.log(dataTrainingList);
        } else if (errorTrainingList) {
            if (
                'status' in errorTrainingList &&
                errorTrainingList.status === statusCodes.ERROR_403
            ) {
                localStorage.removeItem(JVT_TOKEN);
                sessionStorage.removeItem(JVT_TOKEN);
                history.push(paths.auth.path);
            } else {
                setIsModalErrorList(true);
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

    const handleClickCell = (value: Moment, event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();

        const disabled = currentMonth.month() !== value.month();
        const date = value.toDate().toLocaleDateString();
        const rect = event.currentTarget.getBoundingClientRect();
        const windowWidth = window.innerWidth / 1.2;
        setDateClick(date);

        const updateModalPosition = () => {
            const position =
                rect.left > windowWidth
                    ? { top: rect.top + document.documentElement.scrollTop, right: rect.right }
                    : { top: rect.top + document.documentElement.scrollTop, left: rect.left };

            setModalPosition({
                ...position,
                date,
                disabled,
            });
        };

        setIsModalAddTraining(false);

        if (isModalAddTraining) {
            setTimeout(updateModalPosition, 120);
        } else {
            updateModalPosition();
        }

        setIsModalOpen(true);
    };

    const handleMonthChange = (value: Moment, mode: string) => {
        setIsModalOpen(false);
        setIsModalAddTraining(false);
        if (mode === 'month') {
            setCurrentMonth(value);
        }
    };

    const dateCellRender = (value: Moment) => {
        const listData = getListData(value);
        return (
            <div
                id={'cell'}
                className={'wrapper-events'}
                onClick={(event) => handleClickCell(value, event)}
            >
                <ul className='events'>
                    {listData.map((item, index) => (
                        <li key={index}>
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
                onPanelChange={handleMonthChange}
                dateCellRender={dateCellRender}
            />
            <TrainingModal
                isModal={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                modalPosition={modalPosition}
                addTraining={setIsModalAddTraining}
            />
            <ErrorTrainingModal
                isModal={isModalErrorList}
                closeModal={() => setIsModalErrorList(false)}
            />
            <CreateTrainingModal
                isModal={isModalAddTraining}
                closeModal={() => setIsModalAddTraining(false)}
                modalPosition={modalPosition}
                dataTrainingList={dataTrainingList}
                addTraining={setIsModalOpen}
                openTrainingDraver={setIsModalOpenDraver}
                sendDraverInfo={setSelectTraining}
            />
            <TrainingDraver
                isModal={isModalOpenDraver}
                closeModal={() => setIsModalOpenDraver(false)}
                typeTraining={selectTraining}
                date={dateClick}
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
