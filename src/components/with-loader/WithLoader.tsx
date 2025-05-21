import { ComponentType } from 'react';

import { Overlay } from '../overlay/Overlay';

export const withLoader =
    <P extends object>(Component: ComponentType<P>, LoaderComponent: ComponentType = Overlay) =>
    (props: P & { isLoading?: boolean }) => {
        const { isLoading, ...rest } = props;
        return (
            <>
                <Component {...(rest as P)} />
                {isLoading && <LoaderComponent />}
            </>
        );
    };
