import React, {useEffect, useState} from 'react';
import {Drawer, Radio, Space} from 'antd';
import {CheckCircleFilled, CloseCircleOutlined, CloseOutlined} from "@ant-design/icons";
import './RateDrawer.css'

type RateDrawerProps = {
    isModal: boolean;
    closeModal: () => void;
};

export const RateDrawer: React.FC<RateDrawerProps> = ({isModal, closeModal}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(isModal);
    }, [isModal]);

    const onClose = () => {
        closeModal();
        setOpen(false);
    };

    return (
        <Drawer className={'drawer-rate'} title='Сравнить тарифы' placement='right'
                onClose={onClose} open={open}
                getContainer={false} mask={false} width={408}
                maskClosable={false} closeIcon={
            <div
                style={{
                    position: 'absolute',
                    right: 32,
                    top: 30,
                    fontSize: 13,
                }}
            >
                <CloseOutlined data-test-id='modal-drawer-right-button-close'/>
            </div>
        }>
            <div className={'wrapper-tariff'}>
                <div className={'free'}>FREE</div>
                <div className={'pro'}>PRO</div>
            </div>
            <p><div>Статистика за месяц</div> <CheckCircleFilled/> <CheckCircleFilled/></p>
            <p><div>Статистика за всё время</div>  <CloseCircleOutlined/> <CheckCircleFilled/></p>
            <p><div>Совместные тренировки</div>  <CheckCircleFilled/> <CheckCircleFilled/></p>
            <p><div>Участие в марафонах</div>  <CloseCircleOutlined/> <CheckCircleFilled/></p>
            <p><div>Приложение iOS</div>  <CloseCircleOutlined/> <CheckCircleFilled/></p>
            <p><div>Приложение Android</div>  <CloseCircleOutlined/> <CheckCircleFilled/></p>
            <p><div>Индивидуальный Chat GPT</div>  <CloseCircleOutlined/> <CheckCircleFilled/></p>
            <div className={'price-title'}>Стоимость тарифа</div>
            <Radio.Group>
                <Space direction="vertical">
                    <Radio value={1}>6 месяцев 5,5 $</Radio>
                    <Radio value={2}>9 месяцев 8,5 $</Radio>
                    <Radio value={3}>12 месяцев 10 $</Radio>
                </Space>
            </Radio.Group>
        </Drawer>
    );
};
