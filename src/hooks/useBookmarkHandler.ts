import { useCallback, useState } from 'react';

import { useBookmarkMutation } from '~/store/slice/api/api-slice';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';

import { useHandleError } from './useErrorHandler';

export function useBookmarkHandler(id: string) {
    const [mutate, { isLoading }] = useBookmarkMutation();
    const [isOpenError, setIsOpenError] = useState(false);
    const [titleError, setTitleError] = useState('');
    const [notification, setNotification] = useState('');
    const handleError = useHandleError(setTitleError, setNotification, 'like-bookmark');

    const onCloseError = useCallback(() => {
        setIsOpenError(false);
    }, []);

    const onClickBookmark = useCallback(async () => {
        if (!id) return;
        try {
            await mutate({ id }).unwrap();
        } catch (err) {
            if (isFetchBaseQueryError(err)) {
                setIsOpenError(true);
                handleError(err);
            }
        }
    }, [id, mutate, handleError]);

    return {
        isLoading,
        isOpenError,
        titleError,
        notification,
        onCloseError,
        onClickBookmark,
    };
}
