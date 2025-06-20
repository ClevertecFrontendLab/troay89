import { Card, Heading, Icon, ResponsiveValue, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'react-router';

import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import { AlertSuccess } from '~/components/alert/alert-success/AlertSuccess';
import { GarbageBlak } from '~/components/icons/GarbageBlak';
import { Overlay } from '~/components/overlay/Overlay';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { useHandleError } from '~/hooks/useErrorHandler';
import { useDeleteNoteMutation } from '~/store/slice/api/api-slice';
import { Note } from '~/type/author';
import { formatDate } from '~/utils/formatDate';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';

import styles from './NotesCard.module.css';

type NotesCardProps = {
    note: Note;
    showCard: 'none' | 'block';
    userId?: string;
    gridColumn?: ResponsiveValue<string>;
};

export const NotesCard = ({ note, showCard, gridColumn, userId }: NotesCardProps) => {
    const { pathname } = useLocation();
    const myNotes = pathname === '/profile';
    const [deleteNote, { isLoading }] = useDeleteNoteMutation();
    const [isOpenError, setIsOpenError] = useState(false);
    const [title, setTitle] = useState('');
    const [isOpenSuccecc, setIsOpenSuccecc] = useState(false);
    const [notification, setNotification] = useState('');
    const handleError = useHandleError(setTitle, setNotification, 'create-new-notes');

    const handleDeleteNote = async () => {
        if (!userId || !note._id) return;
        try {
            await deleteNote({ noteId: note._id, userId: userId }).unwrap();
            setIsOpenSuccecc(true);
        } catch (err) {
            if (isFetchBaseQueryError(err)) {
                setIsOpenError(true);
                handleError(err);
            }
        }
    };

    return (
        <>
            <Card
                px='23px'
                pt='27px'
                pb='19px'
                gap={4}
                boxShadow='none'
                border='1px solid'
                borderColor='alpha.200'
                borderRadius='8px'
                display={showCard}
                gridColumn={gridColumn}
                pos='relative'
            >
                <Heading
                    className={styles.title}
                    as='h3'
                    data-test-id={DATA_TEST_ID.NOTES_CARD_DATE}
                    pb={4}
                >
                    {formatDate(note.date ?? '')}
                </Heading>
                <Text className={styles.note} data-test-id={DATA_TEST_ID.NOTES_CARD_TEXT}>
                    {note.text}
                </Text>
                {myNotes && (
                    <Icon
                        pos='absolute'
                        as={GarbageBlak}
                        top={27}
                        right={23}
                        pointerEvents='all'
                        onClick={handleDeleteNote}
                    />
                )}
            </Card>
            {isLoading && <Overlay />}
            {isOpenSuccecc && (
                <AlertSuccess
                    message='Заметка удалена'
                    onClose={() => setIsOpenSuccecc(false)}
                    position='fixed'
                    left='50%'
                    transform='-50%'
                />
            )}
            {isOpenError && (
                <ErrorModal
                    onClose={() => setIsOpenError(false)}
                    title={title}
                    notification={notification}
                />
            )}
        </>
    );
};
