import React, { useEffect, useState } from 'react';
import { Badge, Drawer, Input, InputNumber } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import './TrainingDraver.css';
import { DefaultButton } from '@components/buttons/DefaultButton.tsx';
import { DataTraining } from '../../type/Training.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { saveListTraining } from '@redux/reducers/listTrainingSlice.ts';

const BADGE_VALUE = [
    { text: 'Ноги', color: '#FF4D4F' },
    { text: 'Силовая', color: '#FADB14' },
    { text: 'Руки', color: '#13C2C2' },
    { text: 'Грудь', color: '#52C41A' },
    { text: 'Спина', color: '#FA8C16' },
];

type TrainingBadgeProps = {
    typeTraining: string;
};

type TrainingDataProps = {
    index: number;
    trainingData: DataTraining[];
    setTrainingData(value: DataTraining[]): void;
};

const TrainingBadge: React.FC<TrainingBadgeProps> = ({ typeTraining }) => {
    const badgeObject = BADGE_VALUE.find((item) => item.text === typeTraining);
    return (
        badgeObject && (
            <Badge text={badgeObject.text} color={badgeObject.color} className={'type-training'} />
        )
    );
};

// <EditOutlined />

const TrainingData: React.FC<TrainingDataProps> = ({ index, trainingData, setTrainingData }) => {
    const handleInputChange = (field: keyof DataTraining, value: string | number) => {
        const newTrainingData = [...trainingData];
        newTrainingData[index] = {
            ...newTrainingData[index],
            [field]: value,
        };
        setTrainingData(newTrainingData);
    };

    return (
        <span key={index} className={'wrapper-data-training'}>
            <Input size={'small'} onChange={(e) => handleInputChange('name', e.target.value)} />
            <div className={'data-training'}>
                <span className={'wrapper-data'}>
                    <span className={'repeat style'}>Подходы</span>
                    <InputNumber
                        className={'repeat-number'}
                        min={1}
                        max={999}
                        size={'small'}
                        addonBefore='+'
                        onChange={(value) => handleInputChange('repeats', value ?? 1)}
                    />
                </span>
                <span className={'wrapper-data'}>
                    <span className={'weight style'}>Вес, кг</span>
                    <InputNumber
                        min={0}
                        max={999}
                        size={'small'}
                        onChange={(value) => handleInputChange('weight', value ?? 0)}
                    />
                </span>
                <span className={'space-x'}>x</span>
                <span className={'wrapper-data'}>
                    <span className={'cont style'}>Количество</span>
                    <InputNumber
                        min={1}
                        max={999}
                        size={'small'}
                        onChange={(value) => handleInputChange('count', value ?? 1)}
                    />
                </span>
            </div>
        </span>
    );
};

type TrainingDraverProps = {
    isModal: boolean;
    closeModal: () => void;
    typeTraining: string;
    date: string;
};

export const TrainingDraver: React.FC<TrainingDraverProps> = ({
    isModal,
    closeModal,
    typeTraining,
    date,
}) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [trainings, setTrainings] = useState([{}]);
    const [trainingData, setTrainingData] = useState<DataTraining[]>([
        { name: '', repeats: 1, weight: 0, count: 1 },
    ]);

    useEffect(() => {
        setOpen(isModal);
    }, [isModal]);

    const onClose = () => {
        setTrainingData([...trainingData]);
        console.log(trainingData);
        const showListTraining = trainingData.filter((item) => item.name !== '');
        dispatch(saveListTraining(showListTraining));
        closeModal();
        setOpen(false);
    };

    const handleAddTraining = () => {
        setTrainings([...trainings, {}]);
        setTrainingData([...trainingData, { name: '', repeats: 1, weight: 0, count: 1 }]);
        console.log(trainingData);
    };

    return (
        <div className='site-drawer-render-in-current-wrapper'>
            <Drawer
                className={'add-training-drawer'}
                title='+&nbsp;&nbsp;Добавление упражнений'
                placement='right'
                closable={true}
                onClose={onClose}
                open={open}
                getContainer={false}
                style={{ position: 'absolute' }}
                mask={false}
                maskClosable={false}
                width={408}
                closeIcon={
                    <div style={{ position: 'absolute', right: 33, top: 31, fontSize: 13 }}>
                        <CloseOutlined />
                    </div>
                }
            >
                <span className={'wrapper-info'}>
                    <TrainingBadge typeTraining={typeTraining} />
                    <span className={'date'}>{date}</span>
                </span>

                {trainings.map((_, index) => (
                    <TrainingData
                        index={index}
                        setTrainingData={setTrainingData}
                        trainingData={trainingData}
                        key={index}
                    />
                ))}

                <DefaultButton
                    icon={<PlusOutlined />}
                    text={'Добавить ещё'}
                    className={'button-add-training'}
                    onClick={handleAddTraining}
                />
            </Drawer>
        </div>
    );
};
