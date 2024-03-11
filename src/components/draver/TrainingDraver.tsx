import React, { useEffect, useState } from 'react';
import { Badge, Drawer, InputNumber } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './TrainingDraver.css';

type TrainingDraverProps = {
    isModal: boolean;
    closeModal: () => void;
    typeTraining: string;
    date: string;
};

const badgeValue = [
    { text: 'Ноги', color: '#FF4D4F' },
    { text: 'Силовая', color: '#FADB14' },
    { text: 'Руки', color: '#13C2C2' },
    { text: 'Грудь', color: '#52C41A' },
    { text: 'Спина', color: '#FA8C16' },
];

export const TrainingDraver: React.FC<TrainingDraverProps> = ({
    isModal,
    closeModal,
    typeTraining,
    date,
}) => {
    const [open, setOpen] = useState(false);

    const badgeObject = badgeValue.find((item) => item.text === typeTraining);

    useEffect(() => {
        setOpen(isModal);
    }, [isModal]);

    const onClose = () => {
        closeModal();
        setOpen(false);
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
                    {badgeObject && (
                        <Badge
                            text={badgeObject.text}
                            color={badgeObject.color}
                            className={'type-training'}
                        />
                    )}
                    <span className={'date'}>{date}</span>
                </span>

                <div>
                    <span>
                        <span>Подходы</span>
                        <InputNumber min={1} max={999} />
                    </span>
                    <span>
                        <span>Вес, кг</span>
                        <InputNumber min={1} max={999} />
                    </span>
                    <span>
                        <span>Количество</span>
                        <InputNumber min={1} max={999} />
                    </span>
                </div>
            </Drawer>
        </div>
    );
};
