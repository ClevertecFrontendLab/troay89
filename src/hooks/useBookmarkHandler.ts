import { useCallback, useState } from 'react';

import { useBookmarkMutation } from '~/store/slice/api/api-slice';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';

import { useHandleError } from './useErrorHandler';

export function useBookmarkHandler(recipeId: string, authorId: string) {
    const [mutate, { isLoading }] = useBookmarkMutation();
    const [isOpenError, setIsOpenError] = useState(false);
    const [titleError, setTitleError] = useState('');
    const [notification, setNotification] = useState('');
    const handleError = useHandleError(setTitleError, setNotification, 'like-bookmark');

    const onCloseError = useCallback(() => {
        setIsOpenError(false);
    }, []);

    const onClickBookmark = useCallback(async () => {
        if (!recipeId) return;
        try {
            await mutate({ recipeId: recipeId, userId: authorId }).unwrap();
        } catch (err) {
            if (isFetchBaseQueryError(err)) {
                setIsOpenError(true);
                handleError(err);
            }
        }
    }, [recipeId, mutate, authorId, handleError]);

    return {
        isLoading,
        isOpenError,
        titleError,
        notification,
        onCloseError,
        onClickBookmark,
    };
}
