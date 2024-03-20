import React, { useEffect, useState } from 'react';
import { Modal, PageHeader, Select } from 'antd';
import { PersonalTraining, TrainingList } from '../../../type/Training.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import emptyData from '/img/svg/empty-image.svg';
import './CreateTrainingModal.css';
import {
    useAddPersonalTrainingListMutation,
    useEditPersonalTrainingListMutation,
    useLazyGetPersonalTrainingListQuery,
} from '@redux/reducers/apiSlice.ts';
import { savePersonalListTraining } from '@redux/reducers/listPersonalTrainingSlice.ts';
import { history } from '@redux/reducers/routerSlice.ts';
import { JVT_TOKEN, paths, statusCodes } from '@constants/constants.ts';
import { editPersonalTraining } from '@redux/reducers/editTrainingSlice.ts';
import moment from 'moment/moment';
import { useMediaQuery } from 'react-responsive';
import { Position } from '@pages/calendar/CustomCalendar.tsx';

type CreateTrainingModalProps = {
    isModal: boolean;
    modalPosition: Position | null;
    closeModal: () => void;
    dataTrainingList: TrainingList[] | undefined;
    addTraining: (value: boolean) => void;
    openTrainingDraver: (value: boolean) => void;
    sendDraverInfo: (type: string) => void;
    setIsModalErrorSaveList: (value: boolean) => void;
    kindTraining: PersonalTraining[] | undefined;
};

export const CreateTrainingModal: React.FC<CreateTrainingModalProps> = ({
    isModal,
    closeModal,
    modalPosition,
    dataTrainingList,
    addTraining,
    openTrainingDraver,
    sendDraverInfo,
    setIsModalErrorSaveList,
    kindTraining,
}) => {
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    const [extraLoader, setExtraloader] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('Выбор типа тренировки');
    const listTraining = useAppSelector((state) => state.saveListTraining.listTraining);
    const listEditTraining = useAppSelector(
        (state) => state.editPersonalTraining.listPersonalTraining,
    );
    const [addPersonalTrainingList, { data, isLoading, error }] =
        useAddPersonalTrainingListMutation();
    const dispatch = useAppDispatch();

    const [getPersonalTrainingList, { data: dataPersonalTraining, error: errorPersonalTraining }] =
        useLazyGetPersonalTrainingListQuery();
    const [
        editPersonalTrainingList,
        {
            data: dataEditPersonalTraining,
            isLoading: isLoadingEdit,
            error: errorEditPersonalTraining,
        },
    ] = useEditPersonalTrainingListMutation();

    useEffect(() => {
        if (errorEditPersonalTraining) {
            addTraining(false);
            setExtraloader(false);
            setIsModalErrorSaveList(true);
        }
    }, [
        addTraining,
        dataEditPersonalTraining,
        errorEditPersonalTraining,
        getPersonalTrainingList,
        setIsModalErrorSaveList,
    ]);

    useEffect(() => {
        if (extraLoader) {
            getPersonalTrainingList();
            addTraining(true);
        }
        setExtraloader(false);
    }, [addTraining, extraLoader, getPersonalTrainingList]);

    useEffect(() => {
        if (dataPersonalTraining) {
            dispatch(savePersonalListTraining(dataPersonalTraining));
        } else if (errorPersonalTraining) {
            if (
                'status' in errorPersonalTraining &&
                errorPersonalTraining.status === statusCodes.ERROR_403
            ) {
                localStorage.removeItem(JVT_TOKEN);
                sessionStorage.removeItem(JVT_TOKEN);
                history.push(paths.auth.path);
            }
        }
    }, [dataPersonalTraining, dispatch, errorPersonalTraining]);

    useEffect(() => {
        setIsModalOpen(isModal);
        listEditTraining && setSelectedValue(listEditTraining.name);
        if (!isModal) {
            setSelectedValue('Выбор типа тренировки');
        }
    }, [dataTrainingList, isModal, listEditTraining]);

    useEffect(() => {
        if (data) {
            addTraining(true);
            getPersonalTrainingList();
        } else if (error) {
            setIsModalErrorSaveList(true);
        }
    }, [addTraining, data, error, getPersonalTrainingList, setIsModalErrorSaveList]);

    const handleOk = () => {
        const tomorrow = moment().add(1, 'days').startOf('day');
        {
            const data = listEditTraining
                ? [...listEditTraining.exercises]
                : [...listTraining.data];
            const exercises = data.map((training) => ({
                name: training.name,
                replays: training.replays ?? 1,
                weight: training.weight ?? 0,
                approaches: training.approaches ?? 1,
                isImplementation: false,
            }));
            if (listEditTraining) {
                const isFinish =
                    new Date(listEditTraining.date).getTime() < tomorrow.toDate().getTime();
                listEditTraining.exercises.length === 0
                    ? setIsModalErrorSaveList(true)
                    : editPersonalTrainingList({
                          _id: listEditTraining._id,
                          name: listEditTraining.name,
                          date: listEditTraining.date,
                          isImplementation: isFinish,
                          parameters: {
                              repeat: false,
                              period: 1,
                              jointTraining: false,
                              participants: [],
                          },
                          exercises: exercises,
                      });
                setExtraloader(true);
            } else {
                addPersonalTrainingList({
                    name: listTraining.kindTraining,
                    date: listTraining.date.split('.').reverse().join('-') + 'T12:00:00.000Z',
                    isImplementation: false,
                    parameters: {
                        repeat: false,
                        period: 1,
                        jointTraining: false,
                        participants: [],
                    },
                    exercises: exercises,
                });
            }
            dispatch(editPersonalTraining(null));
            setTimeout(() => {
                openTrainingDraver(false);
                setIsModalOpen(false);
                closeModal();
            }, 0);
        }
    };

    const handleAddTraining = () => {
        sendDraverInfo(selectedValue);
        openTrainingDraver(true);
    };

    const handleChange = (value: string) => {
        setSelectedValue(value);
        dispatch(editPersonalTraining(null));
    };

    const handleBack = () => {
        addTraining(true);
        dispatch(editPersonalTraining(null));
        openTrainingDraver(false);
        setTimeout(() => {
            setIsModalOpen(false);
            closeModal();
        }, 0);
    };

    const kindTrainingNames = kindTraining ? kindTraining.map((training) => training.name) : [];

    const filteredTrainingList = dataTrainingList
        ? dataTrainingList.filter((training) => !kindTrainingNames.includes(training.name))
        : [];

    return (
        <>
            {modalPosition ? (
                <Modal
                    data-test-id={'modal-create-exercise'}
                    getContainer={'.ant-picker-cell'}
                    className={'modal-add-training'}
                    open={isModalOpen}
                    onOk={handleOk}
                    closable={false}
                    onCancel={handleAddTraining}
                    okButtonProps={{
                        className: 'style-loading',
                        type: 'default',
                        disabled:
                            (!listTraining.data[0] || listTraining.data[0].name === '') &&
                            !listEditTraining,
                        loading: isLoading || isLoadingEdit,
                    }}
                    cancelButtonProps={{
                        disabled: selectedValue === 'Выбор типа тренировки',
                    }}
                    okText={listEditTraining && isMobile ? 'Сохранить изменения' : `Сохранить`}
                    cancelText={'Добавить упражнения'}
                    style={{
                        top: modalPosition.top - 167,
                        ...(modalPosition.right !== undefined
                            ? { left: modalPosition.right - 264 }
                            : { left: modalPosition.left }),
                        maxWidth: !isMobile ? 264 : 312,
                    }}
                    mask={false}
                >
                    <PageHeader
                        className='site-page-header'
                        onBack={handleBack}
                        backIcon={
                            <ArrowLeftOutlined data-test-id='modal-exercise-training-button-close' />
                        }
                        style={{ borderBottom: '1px solid #EEE' }}
                        extra={[
                            <Select
                                data-test-id='modal-create-exercise-select'
                                className={'select-training'}
                                key='select'
                                value={selectedValue || 'Выбор типа тренировки'}
                                bordered={true}
                                onChange={handleChange}
                                style={{ width: !isMobile ? 223 : 271 }}
                                options={[
                                    ...filteredTrainingList.map((training) => ({
                                        value: training.name,
                                        label: training.name,
                                        key: training.key,
                                    })),
                                ]}
                            />,
                        ]}
                    />
                    {isModal || (!listEditTraining && listTraining.data.length) ? (
                        <ul className={'list-name-training'}>
                            {listEditTraining ? (
                                listEditTraining.exercises.map((training, index) => (
                                    <li className={'name-training'} key={index}>
                                        {training.name}{' '}
                                        <EditOutlined
                                            className={'edit-training'}
                                            onClick={handleAddTraining}
                                            data-test-id={`modal-update-training-edit-button${index}`}
                                        />
                                    </li>
                                ))
                            ) : listTraining.data.length > 0 ? (
                                listTraining.data.map((training, index) => (
                                    <li className={'name-training'} key={index}>
                                        {training.name}{' '}
                                        <EditOutlined
                                            className={'edit-training'}
                                            onClick={handleAddTraining}
                                            data-test-id={`modal-update-training-edit-button${index}`}
                                        />
                                    </li>
                                ))
                            ) : (
                                <>
                                    <p className={'text'}>Нет активных тренировок</p>
                                    <img
                                        className={'img-not-data'}
                                        src={emptyData}
                                        alt={'not data'}
                                    />
                                </>
                            )}
                        </ul>
                    ) : null}
                </Modal>
            ) : null}
        </>
    );
};
