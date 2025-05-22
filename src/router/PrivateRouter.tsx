import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

export const PrivateRoute = ({ children }: PropsWithChildren) => {
    const storedToken = localStorage.getItem('accessToken');

    if (!storedToken) {
        return <Navigate to='/account/login' replace />;
    }

    return children;
};
