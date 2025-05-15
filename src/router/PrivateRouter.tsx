import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

export const PrivateRoute = ({ children }: PropsWithChildren) => {
    const storedToken = localStorage.getItem('accessToken');
    // const [token, setToken] = useState<string | null>(storedToken);

    // const {
    //     isLoading: checkLoading,
    //     error: checkError,
    //     refetch: refetchCheck,
    // } = useCheckQuery(undefined, { skip: !token });

    // const [triggerRefresh, { data: refreshData, isLoading: refreshLoading, error: refreshError }] =
    //     useLazyRefreshQuery();

    // useEffect(() => {
    //     if (token && checkError && typeof checkError === 'object' && 'status' in checkError) {
    //         const error = checkError as FetchBaseQueryError;
    //         if (error.status === 403) {
    //             triggerRefresh();
    //         }
    //     }
    // }, [checkError, token, triggerRefresh]);

    // useEffect(() => {
    //     if (refreshData?.accessToken) {
    //         localStorage.setItem('accessToken', refreshData.accessToken);
    //         setToken(refreshData.accessToken);
    //         refetchCheck();
    //     }
    // }, [refreshData, refetchCheck]);

    if (!storedToken) {
        return <Navigate to='/account/login' replace />;
    }

    // if (checkLoading || refreshLoading) {
    //     return <Overlay />;
    // }

    // if (checkError && refreshError) {
    //     return <Navigate to='/account/login' replace />;
    // }

    return children;
};
