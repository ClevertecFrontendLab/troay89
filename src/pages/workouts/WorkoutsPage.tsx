import React, { useState } from 'react';
import { LayoutComponent } from '@components/layout';
import './Workouts.css';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';
import { WorkoutDrawer } from '@components/draver/workouts-drawer/WorkoutDrawer.tsx';

const TITLES = ['Мои тренировки', 'Совместные тренировки', 'Марафоны'];

export const WorkoutsPage: React.FC = () => {
    const [activeTitle, setActiveTitle] = useState(TITLES[0]);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

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
                    />
                </>
            )}
        </LayoutComponent>
    );
};
