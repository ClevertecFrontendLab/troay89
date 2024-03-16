import { ConfigProvider } from 'antd';
import { Calendar } from 'antd';
import type { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { LayoutComponent } from '@components/layout';
import ruRU from 'antd/lib/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';
import { TrainingModal } from '@components/modal/training-modal/TrainingModal.tsx';
import { useLazyGetTrainingListQuery } from '@redux/reducers/apiSlice.ts';
import { Loader } from '@components/loader/Loader.tsx';
import { JVT_TOKEN, paths, statusCodes } from '@constants/constants.ts';
import { history } from '@redux/reducers/routerSlice.ts';
import './TrainingList.css';
import { CreateTrainingModal } from '@components/modal/create-training-modal/CreateTrainingModal.tsx';
import { TrainingBadge, TrainingDraver } from '@components/draver/TrainingDraver.tsx';
import { PersonalTraining } from '../../type/Training.ts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { ErrorTrainingModal } from '@components/modal/error-training-modal/ErrorTrainingModal.tsx';
import { ErrorSaveTrainingModal } from '@components/modal/error-training-modal/ErrorSaveTrainingModal.tsx';

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

const TrainingCalendar: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDraver, setIsModalOpenDraver] = useState(false);
    const [isModalAddTraining, setIsModalAddTraining] = useState(false);
    const [isModalErrorList, setIsModalErrorList] = useState(false);
    const [isModalErrorSaveList, setIsModalErrorSaveList] = useState(false);
    const [selectTraining, setSelectTraining] = useState('');
    const [dateClick, setDateClick] = useState('');
    const [modalPosition, setModalPosition] = useState<Position | null>(null);
    const [listKindTraining, setListKindTraining] = useState<PersonalTraining[]>();
    const dataPersonalTraining = useAppSelector(
        (state) => state.savePersonalListTraining.listPersonalTraining,
    );
    const [
        getTrainingList,
        { data: dataTrainingList, isLoading: isLoadingTrainingList, error: errorTrainingList },
    ] = useLazyGetTrainingListQuery();

    useEffect(() => {
        if (!isModalErrorList) {
            getTrainingList();
        }
    }, [getTrainingList, isModalErrorList]);

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
        if (isModalOpen) {
            const cellDate = dateClick.split('.').reverse().join('-');
            const matchingTrainings = dataPersonalTraining.filter(
                (training) => training.date.slice(0, 10) === cellDate,
            );
            setListKindTraining([...matchingTrainings]);
        }
    }, [dataPersonalTraining, dateClick, isModalOpen]);

    if (isLoadingTrainingList) {
        return <Loader />;
    }

    const updateModalPosition = (
        rect: DOMRect,
        windowWidth: number,
        rectFirstCellLeft: number,
        date: string,
        disabled: boolean,
    ) => {
        const position =
            rect.left > (windowWidth / 100) * 90
                ? {
                      top: rect.top + document.documentElement.scrollTop,
                      right: rect.right - rectFirstCellLeft,
                  }
                : {
                      top: rect.top + document.documentElement.scrollTop,
                      left: rect.left - rectFirstCellLeft,
                  };

        setModalPosition({
            ...position,
            date,
            disabled,
        });
    };

    const findMatchingTrainings = (cellDate: string) =>
        dataPersonalTraining.filter((training) => training.date.slice(0, 10) === cellDate);

    const handleClickCell = (value: Moment, event: React.MouseEvent<HTMLElement>) => {
        const cellDate = value.format('YYYY-MM-DD');
        const matchingTrainings = findMatchingTrainings(cellDate);
        setListKindTraining([...matchingTrainings]);
        setIsModalAddTraining(false);
        event.stopPropagation();
        event.preventDefault();
        const tomorrow = moment().add(1, 'days').startOf('day');
        const disabled = value.toDate().getTime() < tomorrow.toDate().getTime();
        const date = value.toDate().toLocaleDateString();
        const rect = event.currentTarget.getBoundingClientRect();
        const windowWidth = window.innerWidth / 1.2;
        const firstCell = document.querySelector('.ant-picker-cell');
        const rectFirstCellLeft = (firstCell && firstCell.getBoundingClientRect().left) ?? 0;
        setDateClick(date);

        if (isModalAddTraining) {
            setTimeout(
                () => updateModalPosition(rect, windowWidth, rectFirstCellLeft, date, disabled),
                130,
            );
        } else {
            updateModalPosition(rect, windowWidth, rectFirstCellLeft, date, disabled);
        }

        if (isModalOpenDraver) {
            setIsModalOpenDraver(false);
        }
        setIsModalOpen(true);
    };

    const handleMonthChange = () => {
        setIsModalOpen(false);
        setIsModalAddTraining(false);
    };

    const dateCellRender = (value: Moment) => {
        const cellDate = value.format('YYYY-MM-DD');
        const matchingTrainings = findMatchingTrainings(cellDate);
        return (
            <div
                id={'cell'}
                className={'wrapper-events'}
                onClick={(event) => handleClickCell(value, event)}
            >
                <ul className='events'>
                    {matchingTrainings &&
                        matchingTrainings.map((training, index) => (
                            <li key={index} className={'event'}>
                                <TrainingBadge
                                    className={training.isImplementation ? 'finish' : undefined}
                                    typeTraining={training.name}
                                />
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
                kindTraining={listKindTraining}
                addDrawer={setIsModalOpenDraver}
            />
            <ErrorTrainingModal
                isModal={isModalErrorList}
                closeModal={() => setIsModalErrorList(false)}
            />
            <ErrorSaveTrainingModal
                isModal={isModalErrorSaveList}
                closeModal={() => setIsModalErrorSaveList(false)}
            />
            <CreateTrainingModal
                isModal={isModalAddTraining}
                closeModal={() => setIsModalAddTraining(false)}
                modalPosition={modalPosition}
                dataTrainingList={dataTrainingList}
                kindTraining={listKindTraining}
                addTraining={setIsModalOpen}
                openTrainingDraver={setIsModalOpenDraver}
                sendDraverInfo={setSelectTraining}
                setIsModalErrorSaveList={setIsModalErrorSaveList}
            />
            <TrainingDraver
                isModal={isModalOpenDraver}
                closeModal={() => setIsModalOpenDraver(false)}
                typeTraining={selectTraining}
                date={dateClick}
                isCreateTrainingModal={isModalAddTraining}
                trainingModal={isModalOpen}
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
