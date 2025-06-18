import { Button } from '@chakra-ui/react';

import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import { DeleteBookMark } from '~/components/icons/DeleteBookMark';
import { useBookmarkHandler } from '~/hooks/useBookmarkHandler';

import styles from './RemoveBookmarkButton.module.css';

type RemoveBookmarkButtonProps = {
    id: string;
};

export const RemoveBookmarkButton = ({ id }: RemoveBookmarkButtonProps) => {
    const { isLoading, isOpenError, titleError, notification, onCloseError, onClickBookmark } =
        useBookmarkHandler(id);

    return (
        <>
            <Button
                className={styles.button}
                px='11px'
                variant='outline'
                size='sm'
                mt='10px'
                mb='9px'
                leftIcon={<DeleteBookMark />}
                alignSelf='flex-end'
                bg='white'
                borderColor='alpha.600'
                onClick={onClickBookmark}
                isLoading={isLoading}
            >
                Убрать из сохраненных
            </Button>
            {isOpenError && (
                <ErrorModal onClose={onCloseError} title={titleError} notification={notification} />
            )}
        </>
    );
};
