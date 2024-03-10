import {Position} from "@pages/training-list/TrainingList.tsx";
import React, {useEffect, useState} from "react";
import {Modal, PageHeader, Select} from "antd";
import './CreateTrainingModal.css'

type CreateTrainingModalProps = {
    isModal: boolean;
    modalPosition: Position | null;
    closeModal: () => void;

};

export const CreateTrainingModal: React.FC<CreateTrainingModalProps> = ({
                                                                            isModal,
                                                                            closeModal,
                                                                            modalPosition,
                                                                        }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen(isModal);
    }, [isModal]);

    const handleOk = () => {
        setIsModalOpen(false);
        closeModal();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        closeModal();
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
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
                        size: 'large',
                        disabled: modalPosition.disabled
                    }}
                    okText='Добавить упражнения'
                    cancelText={'Сохранить'}
                    style={{
                        top: modalPosition.top,
                        ...(modalPosition.right !== undefined
                            ? {left: modalPosition.right - 264}
                            : {left: modalPosition.left}),
                        maxWidth: 264,
                    }}
                    mask={false}
                >
                    <PageHeader
                        className="site-page-header"
                        onBack={() => null}
                        extra={[
                            <Select
                                key="select"
                                defaultValue="lucy"
                                style={{ width: 120 }}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 'jack',
                                        label: 'Jack',
                                        key: 'jack'
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                        key: 'lucy'
                                    },
                                    {
                                        value: 'disabled',
                                        label: 'Disabled',
                                        key: 'disabled'
                                    },
                                    {
                                        value: 'Yiminghe',
                                        label: 'yiminghe',
                                        key: 'yiminghe'
                                    },
                                ]}
                            />
                        ]}
                    />
                </Modal>
            ) : null}
        </>
    );
};
