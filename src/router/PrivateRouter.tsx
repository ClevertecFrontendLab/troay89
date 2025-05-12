import { Navigate } from 'react-router';

import { MainPage } from '~/app/pages/start-page/MainPage';

const PrivateRoute = () => {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken ? <MainPage /> : <Navigate to='/account/login' replace />;
};

export default PrivateRoute;
