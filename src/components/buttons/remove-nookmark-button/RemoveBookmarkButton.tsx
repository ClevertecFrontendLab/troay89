import { Button, useBreakpointValue } from '@chakra-ui/react';

import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import { DeleteBookMark } from '~/components/icons/DeleteBookMark';
import { useBookmarkHandler } from '~/hooks/useBookmarkHandler';

import styles from './RemoveBookmarkButton.module.css';

type RemoveBookmarkButtonProps = {
    recipeId: string;
    authorId: string;
};

export const RemoveBookmarkButton = ({ recipeId, authorId }: RemoveBookmarkButtonProps) => {
    const { isLoading, isOpenError, titleError, notification, onCloseError, onClickBookmark } =
        useBookmarkHandler(recipeId, authorId);
    const showIcon = useBreakpointValue({ base: false, bp95: true });

    return (
        <>
            <Button
                className={styles.button}
                px={{ base: '2px', bp95: '11px' }}
                variant='outline'
                mt={{ base: 0, bp95: '10px' }}
                mb={{ base: 0, bp95: '9px' }}
                size={{ base: 'xs', bp95: 'sm' }}
                leftIcon={showIcon ? <DeleteBookMark /> : undefined}
                alignSelf='flex-end'
                bg='white'
                borderColor='alpha.600'
                onClick={onClickBookmark}
                isLoading={isLoading}
                w={{ base: '158px', bp95: '212px' }}
            >
                Убрать из сохраненных
            </Button>
            {isOpenError && (
                <ErrorModal onClose={onCloseError} title={titleError} notification={notification} />
            )}
        </>
    );
};
