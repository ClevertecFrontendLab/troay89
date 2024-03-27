import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';

type RateDrawerProps = {
    isModal: boolean;
    closeModal: () => void;
};

export const RateDrawer: React.FC<RateDrawerProps> = ({ isModal, closeModal }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(isModal);
    }, [isModal]);

    const onClose = () => {
        closeModal();
        setOpen(false);
    };

    return (
        <Drawer title='Сравнить тарифы' placement='right' onClose={onClose} open={open}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
    );
};
