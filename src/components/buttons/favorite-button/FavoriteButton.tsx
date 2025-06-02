import { Button, Icon, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import BookMark from '~/components/icons/BookMark';
import { useHandleError } from '~/hooks/useErrorHandler';
import { useBookmarkMutation } from '~/store/slice/api/api-slice';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';

import styles from './FavoriteButton.module.css';

type FavoriteButtonProps = {
    id: string;
};

export const FavoriteButton = ({ id }: FavoriteButtonProps) => {
    const [saveRemoveBookmark] = useBookmarkMutation();
    const [isOpenError, setIsOpenError] = useState(false);
    const [titleError, setTitleError] = useState('');
    const [notification, setNotification] = useState('');
    const handleErrorLikeBookmark = useHandleError(setTitleError, setNotification, 'like-bookmark');

    const handleBookmarkRecipe = async () => {
        try {
            if (!id) return;
            await saveRemoveBookmark({ id: id }).unwrap();
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                setIsOpenError(true);
                handleErrorLikeBookmark(error);
            }
        }
    };
    return (
        <>
            <Button
                className={styles.button}
                color='blackAlpha.800'
                bg='white'
                h={{ bp95: 8, base: 6 }}
                pl={{ bp95: 2.5, base: 0 }}
                pr={{ bp95: 3, base: 0 }}
                onClick={handleBookmarkRecipe}
            >
                <Icon as={BookMark} boxSize={{ bp95: 4, base: 3 }} mr={{ bp95: '9px', base: 0 }} />
                <Text display={{ bp95: 'inline', base: 'none' }}>Сохранить</Text>
            </Button>
            {isOpenError && (
                <ErrorModal
                    onClose={() => setIsOpenError(false)}
                    title={titleError}
                    notification={notification}
                />
            )}
        </>
    );
};
