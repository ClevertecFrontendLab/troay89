import React, {useEffect, useState} from 'react';
import {CloseOutlined, EditOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {TrainingData} from '../../../trainingData/TrainingData.tsx';
import {DefaultButton} from '@components/buttons/DefaultButton.tsx';
import {Checkbox, ConfigProvider, DatePicker, Drawer, Select} from 'antd';
import {useMediaQuery} from 'react-responsive';
import {saveDrawerTraining} from '@redux/reducers/drawerReduce.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import './WorkoutDrawer.css';
import ruRU from "antd/lib/locale/ru_RU";
import {TrainingList} from "../../../type/Training.ts";


type WorkoutDrawerProps = {
    isModal: boolean;
    closeModal: () => void;
    dataTrainingList: TrainingList[];
};

export const WorkoutDrawer: React.FC<WorkoutDrawerProps> = ({isModal, closeModal, dataTrainingList}) => {
    const dispatch = useAppDispatch();
    const isMobile = useMediaQuery({query: '(max-width: 500px)'});
    const [open, setOpen] = useState(false);
    const [isChecked, setIsChecked] = useState<Array<boolean>>([]);
    const listDrawer = useAppSelector((state) => state.saveListDrawer.listDrawerTraining);
    const listEditTraining = useAppSelector(
        (state) => state.editPersonalTraining.listPersonalTraining,
    );

    useEffect(() => {
        setOpen(isModal);
    }, [isModal]);

    const onClose = () => {
        closeModal();
        setOpen(false);
    };

    const handleAddTraining = () => {
        dispatch(
            saveDrawerTraining([
                ...listDrawer,
                {name: '', replays: undefined, weight: undefined, approaches: undefined},
            ]),
        );
    };

    return (
        <Drawer
            data-test-id='modal-drawer-right'
            className={'workout-drawer'}
            title={
                // listEditTraining ? (
                //     <>
                //         <EditOutlined className={'edit'} /> {'Редактирование'}
                //     </>
                // ) :
                <>
                    <PlusOutlined className={'plus'}/> {'Новая тренировка'}
                </>
            }
            placement={!isMobile ? 'right' : 'bottom'}
            closable={true}
            onClose={onClose}
            open={open}
            getContainer={false}
            style={{position: 'absolute'}}
            mask={false}
            maskClosable={false}
            width={!isMobile ? 408 : '100%'}
            height={!isMobile ? undefined : 555}
            closeIcon={
                <div
                    style={{
                        position: 'absolute',
                        right: !isMobile ? 33 : 17,
                        top: 31,
                        fontSize: 13,
                    }}
                >
                    <CloseOutlined data-test-id='modal-drawer-right-button-close'/>
                </div>
            }
        >
            <div className={'wrapper-training'}>
                <Select
                    data-test-id='modal-create-exercise-select'
                    className={'select-training'}
                    key='select'
                    value={'Выбор типа тренировки'}
                    bordered={false}
                    size={'small'}
                    // onChange={handleChange}
                    options={[
                        ...dataTrainingList.map((training) => ({
                            value: training.name,
                            label: training.name,
                            key: training.key,
                        })),
                    ]}
                />
                <ConfigProvider locale={ruRU}>
                    <DatePicker className={'pick-date'} size={'small'}/>
                </ConfigProvider>
                <Checkbox>С периодичностью</Checkbox>
                {listDrawer.map((_, index) => (
                    <TrainingData
                        index={index}
                        key={index}
                        listEditTraining={listEditTraining}
                        setIsChecked={setIsChecked}
                        isChecked={isChecked}
                    />
                ))}
            </div>
            <div className={'wrapper-button'}>
                <DefaultButton
                    icon={<PlusOutlined/>}
                    text={'Добавить ещё упражнение'}
                    className={`button-add-training`}
                    onClick={handleAddTraining}
                />
                {/*{listEditTraining && (*/}
                {/*    <DefaultButton*/}
                {/*        icon={<MinusOutlined />}*/}
                {/*        text={'Удалить'}*/}
                {/*        className={'button-add-training edit'}*/}
                {/*        onClick={handleDeleteTraining}*/}
                {/*        disabled={!isChecked.length}*/}
                {/*    />*/}
                {/*)}*/}
            </div>
        </Drawer>
    );
};
