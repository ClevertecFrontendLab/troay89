import React, {useEffect, useState} from 'react';
import {Badge, Drawer, Input, InputNumber} from 'antd';
import {CloseOutlined, PlusOutlined} from '@ant-design/icons';
import './TrainingDraver.css';
import {DefaultButton} from "@components/buttons/DefaultButton.tsx";

const BADGE_VALUE = [
    {text: 'Ноги', color: '#FF4D4F'},
    {text: 'Силовая', color: '#FADB14'},
    {text: 'Руки', color: '#13C2C2'},
    {text: 'Грудь', color: '#52C41A'},
    {text: 'Спина', color: '#FA8C16'},
];

const TrainingBadge = ({typeTraining}) => {
    const badgeObject = BADGE_VALUE.find((item) => item.text === typeTraining);
    return badgeObject && (
        <Badge
            text={badgeObject.text}
            color={badgeObject.color}
            className={'type-training'}
        />
    );
};

const TrainingData = ({index}) => (
    <span key={index} className={'wrapper-data-training'}>
        <Input size={"small"}/>
        <div className={'data-training'}>
            <span className={'wrapper-data'}>
                <span className={'repeat style'}>Подходы</span>
                <InputNumber className={'repeat-number'} min={1} max={999} size={"small"}
                             addonBefore="+"/>
            </span>
            <span className={'wrapper-data'}>
                <span className={'weight style'}>Вес, кг</span>
                <InputNumber min={1} max={999} size={"small"}/>
            </span>
            <span className={'space-x'}>x</span>
            <span className={'wrapper-data'}>
                <span className={'cont style'}>Количество</span>
                <InputNumber min={1} max={999} size={"small"}/>
            </span>
        </div>
    </span>
);

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
    const [open, setOpen] = useState(false);
    const [trainings, setTrainings] = useState([{}]);

    useEffect(() => {
        setOpen(isModal);
    }, [isModal]);

    const onClose = () => {
        closeModal();
        setOpen(false);
    };

    const handleAddTraining = () => {
        setTrainings([...trainings, {}]);
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
                style={{position: 'absolute'}}
                mask={false}
                maskClosable={false}
                width={408}
                closeIcon={
                    <div style={{position: 'absolute', right: 33, top: 31, fontSize: 13}}>
                        <CloseOutlined/>
                    </div>
                }
            >
                <span className={'wrapper-info'}>
                    <TrainingBadge typeTraining={typeTraining}/>
                    <span className={'date'}>{date}</span>
                </span>

                {trainings.map((_, index) => <TrainingData index={index}/>)}

                <DefaultButton icon={<PlusOutlined/>} text={'Добавить ещё'}
                               className={'button-add-training'} onClick={handleAddTraining}/>
            </Drawer>
        </div>
    );
};
