import { Position } from '@pages/training-list/TrainingList.tsx';
import React, { useEffect, useState } from 'react';
import { Modal, PageHeader, Select } from 'antd';
import { PersonalTraining, TrainingList } from '../../../type/Training.ts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { EditOutlined } from '@ant-design/icons';
import './CreateTrainingModal.css';
import { useAddPersonalTrainingListMutation } from '@redux/reducers/apiSlice.ts';

type CreateTrainingModalProps = {
    isModal: boolean;
    modalPosition: Position | null;
    closeModal: () => void;
    dataTrainingList: TrainingList[] | undefined;
    addTraining: (value: boolean) => void;
    openTrainingDraver: (value: boolean) => void;
    sendDraverInfo: (type: string) => void;
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
    kindTraining,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('Выбор типа тренировки');
    const listTraining = useAppSelector((state) => state.saveListTraining.listTraining);
    const [addPersonalTrainingList, { data, error }] = useAddPersonalTrainingListMutation();

    useEffect(() => {
        setIsModalOpen(isModal);
        if (!isModal) {
            setSelectedValue('Выбор типа тренировки');
        }
    }, [dataTrainingList, isModal]);

    useEffect(() => {
        if (data) {
            console.log(data);
        } else if (error) {
            console.log(error);
        }
    }, [data, error]);

    const handleOk = () => {
        const exercises = listTraining.data.map((training) => ({
            name: training.name,
            replays: training.repeats,
            weight: training.weight,
            approaches: training.count,
            isImplementation: false,
        }));
        addPersonalTrainingList({
            name: listTraining.kindTraining,
            date: listTraining.date.split('.').reverse().join('-') + 'T00:00:00.000Z',
            isImplementation: false,
            parameters: { repeat: false, period: 1, jointTraining: false, participants: [] },
            exercises: exercises,
        });
        setIsModalOpen(false);
        closeModal();
    };

    const handleCancel = () => {
        sendDraverInfo(selectedValue);
        openTrainingDraver(true);
    };

    const handleChange = (value: string) => {
        setSelectedValue(value);
    };

    const handleBack = () => {
        setIsModalOpen(false);
        closeModal();
        addTraining(true);
        openTrainingDraver(false);
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
                    onCancel={handleCancel}
                    okButtonProps={{
                        className: 'style-second',
                        disabled: listTraining.date.length === 0,
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
                        {listTraining.data.map((training, index) => (
                            <li className={'name-training'} key={index}>
                                {training.name} <EditOutlined className={'edit-training'} />
                            </li>
                        ))}
                    </ul>
                </Modal>
            ) : null}
        </>
    );
};
