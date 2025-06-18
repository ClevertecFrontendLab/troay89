import { Button, Icon, Text } from '@chakra-ui/react';

import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import BookMark from '~/components/icons/BookMark';
import { useBookmarkHandler } from '~/hooks/useBookmarkHandler';

import styles from './FavoriteButton.module.css';

type FavoriteButtonProps = {
    recipeId: string;
    authorId: string;
};

export const FavoriteButton = ({ recipeId, authorId }: FavoriteButtonProps) => {
    const { isLoading, isOpenError, titleError, notification, onCloseError, onClickBookmark } =
        useBookmarkHandler(recipeId, authorId);
    return (
        <>
            <Button
                className={styles.button}
                color='blackAlpha.800'
                bg='white'
                h={{ bp95: 8, base: 6 }}
                pl={{ bp95: 2.5, base: 0 }}
                pr={{ bp95: 3, base: 0 }}
                onClick={onClickBookmark}
                isLoading={isLoading}
            >
                <Icon as={BookMark} boxSize={{ bp95: 4, base: 3 }} mr={{ bp95: '9px', base: 0 }} />
                <Text display={{ bp95: 'inline', base: 'none' }}>Сохранить</Text>
            </Button>
            {isOpenError && (
                <ErrorModal onClose={onCloseError} title={titleError} notification={notification} />
            )}
        </>
    );
};
