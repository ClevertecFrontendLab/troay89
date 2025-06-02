import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

import { STORAGE_KEY } from '~/constants/storageKey';

export const PrivateRoute = ({ children }: PropsWithChildren) => {
    const storedToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    if (!storedToken) {
        return <Navigate to='/account/login' replace />;
    }

    return children;
};
