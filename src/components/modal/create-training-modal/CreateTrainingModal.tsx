import { Position } from '@pages/training-list/TrainingList.tsx';
import React, { useEffect, useState } from 'react';
import { Modal, PageHeader, Select } from 'antd';
import { PersonalTraining, TrainingList } from '../../../type/Training.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { EditOutlined } from '@ant-design/icons';
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
        { data: dataEditPersonalTraining, error: errorEditPersonalTraining },
    ] = useEditPersonalTrainingListMutation();

    useEffect(() => {
        if (dataEditPersonalTraining) {
            getPersonalTrainingList();
            addTraining(true);
        } else if (errorEditPersonalTraining) {
            console.log(errorEditPersonalTraining);
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
                console.log(listEditTraining);
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
            openTrainingDraver(false);
            setIsModalOpen(false);
            closeModal();
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
        setIsModalOpen(false);
        closeModal();
        addTraining(true);
        openTrainingDraver(false);
        dispatch(editPersonalTraining(null));
    };

    const kindTrainingNames = kindTraining ? kindTraining.map((training) => training.name) : [];

    const filteredTrainingList = dataTrainingList
        ? dataTrainingList.filter((training) => !kindTrainingNames.includes(training.name))
        : [];

    return (
        <>
            {modalPosition ? (
                <Modal
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
                        loading: isLoading,
                    }}
                    cancelButtonProps={{
                        disabled: selectedValue === 'Выбор типа тренировки',
                    }}
                    okText={'Сохранить'}
                    cancelText={'Добавить упражнения'}
                    style={{
                        top: modalPosition.top - 167,
                        ...(modalPosition.right !== undefined
                            ? { left: modalPosition.right - 264 }
                            : { left: modalPosition.left }),
                        maxWidth: 264,
                    }}
                    mask={false}
                >
                    <PageHeader
                        className='site-page-header'
                        onBack={handleBack}
                        style={{ borderBottom: '1px solid #EEE' }}
                        extra={[
                            <Select
                                className={'select-training'}
                                key='select'
                                value={selectedValue}
                                bordered={true}
                                onChange={handleChange}
                                style={{ width: 223 }}
                                options={[
                                    {
                                        value: 'Выбор типа тренировки',
                                        label: 'Выбор типа тренировки',
                                        key: 'jack',
                                    },
                                    ...filteredTrainingList.map((training) => ({
                                        value: training.name,
                                        label: training.name,
                                        key: training.key,
                                    })),
                                ]}
                            />,
                        ]}
                    />
                    <ul className={'list-name-training'}>
                        {listEditTraining
                            ? listEditTraining.exercises.map((training, index) => (
                                  <li className={'name-training'} key={index}>
                                      {training.name}{' '}
                                      <EditOutlined
                                          className={'edit-training'}
                                          onClick={handleAddTraining}
                                      />
                                  </li>
                              ))
                            : listTraining.data.map((training, index) => (
                                  <li className={'name-training'} key={index}>
                                      {training.name}{' '}
                                      <EditOutlined
                                          className={'edit-training'}
                                          onClick={handleAddTraining}
                                      />
                                  </li>
                              ))}
                    </ul>
                </Modal>
            ) : null}
        </>
    );
};
