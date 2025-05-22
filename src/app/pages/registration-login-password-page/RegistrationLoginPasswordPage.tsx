import { useRegistrationMutation } from '~/store/slice/api/api-slice';

import { RegistrationLoginPasswordtWithLoader } from './RegistrationLoginPasswordContent';

export const RegistrationLoginPasswordPage = () => {
    const [registrationUser, { isLoading, isError }] = useRegistrationMutation();
    return (
        <RegistrationLoginPasswordtWithLoader
            isLoading={isLoading}
            registrationUser={registrationUser}
            isError={isError}
        />
    );
};
