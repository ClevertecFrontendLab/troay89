import { Navigate, useSearchParams } from 'react-router';

export const VerificationPage = () => {
    const [searchParams] = useSearchParams();
    const emailVerified = searchParams.get('emailVerified');

    if (emailVerified === 'true') {
        return <Navigate to='/account/login' replace />;
    } else if (emailVerified === 'false') {
        return <Navigate to='/account/registration' replace />;
    }

    return (
        <div>
            <h1>Верификация почты</h1>
            <p>Параметр верификации отсутствует.</p>
        </div>
    );
};
