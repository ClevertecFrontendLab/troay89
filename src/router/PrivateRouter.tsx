import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Navigate } from 'react-router';

import { Overlay } from '~/components/overlay/Overlay';
import { useCheckQuery, useLazyRefreshQuery } from '~/store/slice/app-slice';

export const PrivateRoute = ({ children }: PropsWithChildren) => {
    const storedToken = localStorage.getItem('accessToken');
    const [token, setToken] = useState<string | null>(storedToken);

    const {
        isLoading: checkLoading,
        error: checkError,
        refetch: refetchCheck,
    } = useCheckQuery(undefined, { skip: !token });

    const [triggerRefresh, { data: refreshData, isLoading: refreshLoading, error: refreshError }] =
        useLazyRefreshQuery();

    useEffect(() => {
        if (token && checkError && typeof checkError === 'object' && 'status' in checkError) {
            const error = checkError as FetchBaseQueryError;
            if (error.status === 403) {
                triggerRefresh();
            }
        }
    }, [checkError, token, triggerRefresh]);

    useEffect(() => {
        if (refreshData?.accessToken) {
            localStorage.setItem('accessToken', refreshData.accessToken);
            setToken(refreshData.accessToken);
            refetchCheck();
        }
    }, [refreshData, refetchCheck]);

    if (!token) {
        return <Navigate to='/account/login' replace />;
    }

    if (checkLoading || refreshLoading) {
        return <Overlay />;
    }

    if (checkError && refreshError) {
        return <Navigate to='/account/login' replace />;
    }

    return children;
};
