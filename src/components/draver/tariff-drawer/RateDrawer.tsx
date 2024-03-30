import React, { useEffect, useState } from 'react';
import { Drawer, Radio, RadioChangeEvent, Space } from 'antd';
import {
    CheckCircleFilled,
    CheckCircleOutlined,
    CloseCircleOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import './RateDrawer.css';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';
import { TariffList } from '../../../type/Tariff.ts';
import { useBuyTariffMutation } from '@redux/reducers/apiSlice.ts';
import { SuccessBuy } from '@components/modal/success-buy/SuccessBuy.tsx';
import { useMediaQuery } from 'react-responsive';

type RateDrawerProps = {
    isModal: boolean;
    closeModal: () => void;
    date: string | undefined;
    email: string | undefined;
    dataTariff?: Array<TariffList>;
};

export const RateDrawer: React.FC<RateDrawerProps> = ({
    isModal,
    closeModal,
    dataTariff,
    date,
    email,
}) => {
    const [open, setOpen] = useState(false);
    const [openBuyModal, setOpenBuyModal] = useState(false);
    const [changeDays, setChangeDays] = useState<null | number>(null);
    const [buyTariff] = useBuyTariffMutation();
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

    useEffect(() => {
        setOpen(isModal);
    }, [isModal]);

    const onClose = () => {
        closeModal();
        setOpen(false);
    };

    const handleClick = () => {
        if (changeDays) {
            dataTariff && buyTariff({ tariffId: dataTariff[0]._id, days: changeDays });
            setOpenBuyModal(true);
            setOpen(false);
        }
    };

    function handleRadio(e: RadioChangeEvent) {
        setChangeDays(e.target.value);
    }

    return (
        <>
            <Drawer
                className={'drawer-rate'}
                title='Сравнить тарифы'
                placement={isMobile ? 'bottom' : 'right'}
                onClose={onClose}
                open={open}
                getContainer={false}
                mask={false}
                width={isMobile ? '100%' : 408}
                height={isMobile ? 1040 : undefined}
                maskClosable={false}
                style={{ borderRadius: '8px 0 0 8px' }}
                data-test-id='tariff-sider'
                destroyOnClose={true}
                closeIcon={
                    <div
                        style={{
                            position: 'absolute',
                            right: isMobile ? 16 : 32,
                            top: 30,
                            fontSize: 13,
                        }}
                    >
                        <CloseOutlined data-test-id='modal-drawer-right-button-close' />
                    </div>
                }
                footer={
                    !date && (
                        <PrimaryButton
                            className={'style-second button-tariff'}
                            text={'Выбрать и оплатить'}
                            htmlType={'button'}
                            onClick={handleClick}
                            disabled={!changeDays}
                            dataTestId={'tariff-submit'}
                        />
                    )
                }
            >
                {date && <div className={'active-pro'}> &nbsp;Ваш PRO tarif активен до {date}</div>}
                <div className={'wrapper-tariff'}>
                    <div className={'free'}>FREE</div>
                    <div className={`pro ${date && 'active'}`}>
                        PRO {date && !isMobile && <CheckCircleOutlined />}
                    </div>
                </div>
                <div className={'benefits'}>
                    <div>Статистика за месяц</div>
                    <CheckCircleFilled /> <CheckCircleFilled />
                </div>
                <div className={'benefits'}>
                    <div>Статистика за всё время</div>
                    <CloseCircleOutlined /> <CheckCircleFilled />
                </div>
                <div className={'benefits'}>
                    <div>Совместные тренировки</div>
                    <CheckCircleFilled /> <CheckCircleFilled />
                </div>
                <div className={'benefits'}>
                    <div>Участие в марафонах</div>
                    <CloseCircleOutlined /> <CheckCircleFilled />
                </div>
                <div className={'benefits'}>
                    <div>Приложение iOS</div>
                    <CloseCircleOutlined /> <CheckCircleFilled />
                </div>
                <div className={'benefits'}>
                    <div>Приложение Android</div>
                    <CloseCircleOutlined /> <CheckCircleFilled />
                </div>
                <div className={'benefits'}>
                    <div>Индивидуальный Chat GPT</div>
                    <CloseCircleOutlined /> <CheckCircleFilled />
                </div>
                {!date && (
                    <>
                        <div className={'price-title'}>Стоимость тарифа</div>
                        <Radio.Group className={'choose-price'} data-test-id='tariff-cost'>
                            <Space direction='vertical'>
                                {dataTariff &&
                                    dataTariff[0].periods.map((period, index) => (
                                        <Radio
                                            value={period.days}
                                            key={index}
                                            onChange={handleRadio}
                                            data-test-id={index === 2 ? 'tariff-10' : undefined}
                                        >
                                            <span className={'month'}>{period.text}</span>
                                            <span className={'price'}>
                                                {period.cost.toString().replace('.', ',')} $
                                            </span>
                                        </Radio>
                                    ))}
                            </Space>
                        </Radio.Group>
                    </>
                )}
            </Drawer>
            <SuccessBuy
                isOpen={openBuyModal}
                closeModal={() => setOpenBuyModal(false)}
                email={email}
            />
        </>
    );
};
