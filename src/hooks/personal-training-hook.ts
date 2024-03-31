import { useState, useEffect } from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { useLazyGetPersonalTrainingListQuery } from '@redux/reducers/apiSlice.ts';
import { JVT_TOKEN, paths, statusCodes } from '@constants/constants.ts';
import { savePersonalListTraining } from '@redux/reducers/listPersonalTrainingSlice.ts';
import { history } from '@redux/reducers/routerSlice.ts';

export const usePersonalTrainingList = () => {
    const dispatch = useAppDispatch();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isCalendar, setIsCalendar] = useState(false)
    const [
        getPersonalTrainingList,
        {
            data: personalTrainingData,
            isLoading: personalTrainingIsLoading,
            error: personalTrainingError,
        },
    ] = useLazyGetPersonalTrainingListQuery();

    const handleClickCalendar = () => {
        setIsCalendar(true)
        getPersonalTrainingList();
    };

    const handleClickWorkout = () => {
        setIsCalendar(false)
        getPersonalTrainingList();
    };

    useEffect(() => {
        if (personalTrainingData) {
            setIsOpenModal(false);
            dispatch(savePersonalListTraining(personalTrainingData));
            isCalendar ? history.push(paths.trainingList.path) : history.push(paths.workouts.path);
        } else if (personalTrainingError) {
            if (
                'status' in personalTrainingError &&
                personalTrainingError.status === statusCodes.ERROR_403
            ) {
                localStorage.removeItem(JVT_TOKEN);
                sessionStorage.removeItem(JVT_TOKEN);
                history.push(paths.auth.path);
            } else {
                setIsOpenModal(true);
            }
        }
    }, [dispatch, personalTrainingData, personalTrainingError]);

    return {
        isOpenModal,
        handleClickCalendar,
        personalTrainingIsLoading,
        setIsOpenModal,
        handleClickWorkout
    };
};
