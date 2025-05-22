import { useLoginMutation } from '~/store/slice/api/api-slice';

import { LoginContentWithLoader } from './LoginContent';

export const LoginPage = () => {
    const [loginUser, { isLoading, isError }] = useLoginMutation();
    return <LoginContentWithLoader isLoading={isLoading} loginUser={loginUser} isError={isError} />;
};
