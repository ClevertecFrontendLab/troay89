import React, {useEffect, useState} from 'react';
import { LayoutComponent } from '@components/layout';
import './Workouts.css';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';
import { WorkoutDrawer } from '@components/draver/workouts-drawer/WorkoutDrawer.tsx';
import {useLazyGetTrainingListQuery} from "@redux/reducers/apiSlice.ts";
import {JVT_TOKEN, paths, statusCodes} from "@constants/constants.ts";
import {history} from "@redux/reducers/routerSlice.ts";
import {ErrorTrainingModal} from "@components/modal/error-training-modal/ErrorTrainingModal.tsx";

const TITLES = ['Мои тренировки', 'Совместные тренировки', 'Марафоны'];

export const WorkoutsPage: React.FC = () => {
    const [activeTitle, setActiveTitle] = useState(TITLES[0]);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isModalErrorList, setIsModalErrorList] = useState(false);
    const [updateData, setUpdateData] = useState(true);

    const [
        getTrainingList,
        { data: dataTrainingList, isLoading: isLoadingTrainingList, error: errorTrainingList },
    ] = useLazyGetTrainingListQuery();

    useEffect(() => {
        if (updateData) {
            getTrainingList();
            setUpdateData(false);
        }
    }, [getTrainingList, updateData]);

    useEffect(() => {
        if (errorTrainingList) {
            if (
                'status' in errorTrainingList &&
                errorTrainingList.status === statusCodes.ERROR_403
            ) {
                localStorage.removeItem(JVT_TOKEN);
                sessionStorage.removeItem(JVT_TOKEN);
                history.push(paths.auth.path);
            } else {
                setIsModalErrorList(true);
            }
        }
    }, [errorTrainingList]);

    const handleClick = () => setIsOpenDrawer(true);

    return (
        <LayoutComponent>
            {() => (
                <>
                    <div className='wrapper-content-workout'>
                        <div className='content-workout'>
                            <div className='wrapper-title'>
                                {TITLES.map((title) => (
                                    <div
                                        key={title}
                                        className={activeTitle === title ? 'title-border' : ''}
                                        onClick={() => setActiveTitle(title)}
                                    >
                                        <div className={activeTitle === title ? 'active' : ''}>
                                            {title}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='content'>
                                <p className='empty-message'>У вас ещё нет созданных тренировок</p>
                                <PrimaryButton
                                    className='style-second'
                                    text='Создать тренировку'
                                    htmlType='button'
                                    onClick={handleClick}
                                />
                            </div>
                        </div>
                    </div>
                    <WorkoutDrawer
                        isModal={isOpenDrawer}
                        closeModal={() => setIsOpenDrawer(false)}
                        dataTrainingList={dataTrainingList ? dataTrainingList : []}
                    />
                    <ErrorTrainingModal
                        isModal={isModalErrorList}
                        closeModal={() => setIsModalErrorList(false)}
                        update={setUpdateData}
                    />
                </>
            )}
        </LayoutComponent>
    );
};
