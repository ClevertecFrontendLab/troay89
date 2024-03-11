import { Position } from '@pages/training-list/TrainingList.tsx';
import React, { useEffect, useState } from 'react';
import { Modal, PageHeader, Select } from 'antd';
import './CreateTrainingModal.css';
import { TrainingList } from '../../../type/Training.ts';

type CreateTrainingModalProps = {
    isModal: boolean;
    modalPosition: Position | null;
    closeModal: () => void;
    dataTrainingList: TrainingList[] | undefined;
    addTraining: (value: boolean) => void;
    openTrainingDraver: (value: boolean) => void;
    sendDraverInfo: (type: string) => void;
};

export const CreateTrainingModal: React.FC<CreateTrainingModalProps> = ({
    isModal,
    closeModal,
    modalPosition,
    dataTrainingList,
    addTraining,
    openTrainingDraver,
    sendDraverInfo,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('Выбор типа тренировки');

    useEffect(() => {
        setIsModalOpen(isModal);
        if (!isModal) {
            setSelectedValue('Выбор типа тренировки');
        }
    }, [dataTrainingList, isModal]);

    const handleOk = () => {
        setIsModalOpen(false);
        closeModal();
    };

    const handleCancel = () => {
        sendDraverInfo(selectedValue);
        openTrainingDraver(true);
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
        setSelectedValue(value);
    };

    const handleBack = () => {
        setIsModalOpen(false);
        closeModal();
        addTraining(true);
    };

    return (
        <>
            {modalPosition ? (
                <Modal
                    getContainer={'#root'}
                    className={'modal-add-training'}
                    open={isModalOpen}
                    onOk={handleOk}
                    closable={false}
                    onCancel={handleCancel}
                    okButtonProps={{
                        className: 'style-second',
                    }}
                    okText={'Сохранить'}
                    cancelText={'Добавить упражнения'}
                    style={{
                        top: modalPosition.top,
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
                                    ...(dataTrainingList || []).map((training) => ({
                                        value: training.name,
                                        label: training.name,
                                        key: training.key,
                                    })),
                                ]}
                            />,
                        ]}
                    />
                    <p>dewfwe</p>
                </Modal>
            ) : null}
        </>
    );
};
