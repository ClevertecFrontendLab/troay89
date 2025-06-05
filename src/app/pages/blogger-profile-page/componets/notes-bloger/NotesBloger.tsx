import { Button, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { NotesCard } from '../notes-card/NotesCard';
import styles from './NotesBloger.module.css';

type NotesBlogerProps = {
    notes: number[];
};

export const NotesBloger = ({ notes }: NotesBlogerProps) => {
    const [showAll, setShowAll] = useState(false);
    const toggleShowAll = () => setShowAll((prev) => !prev);

    if (!showAll) {
        const initialNotes = notes.length > 3 ? notes.slice(0, 3) : notes;
        return (
            <VStack
                gap={0}
                bg='alpha.50'
                id='notes'
                align='flex-start'
                px={6}
                pt={6}
                pb={4}
                mb={10}
            >
                <Heading as='h2' className={styles.title} pb={4}>
                    Заметки{' '}
                    <Text as='span' color='alpha.600'>
                        ({notes.length})
                    </Text>
                </Heading>
                <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                    {initialNotes.map((_, index) => (
                        <NotesCard key={index} />
                    ))}
                </Grid>
                {notes.length > 3 && (
                    <Button
                        className={styles.button}
                        size='sm'
                        alignSelf='center'
                        mt={4}
                        variant='ghost'
                        _hover={{}}
                        onClick={toggleShowAll}
                    >
                        Показать больше
                    </Button>
                )}
            </VStack>
        );
    }

    const fullNotesCount = Math.floor(notes.length / 3) * 3;
    const fullNotes = notes.slice(0, fullNotesCount);
    const remainderNotes = notes.slice(fullNotesCount);

    return (
        <VStack gap={0} bg='alpha.50' align='flex-start' px={6} pt={6} pb={4} mb={10}>
            <Heading as='h2' className={styles.title} pb={4}>
                Заметки{' '}
                <Text as='span' color='alpha.600'>
                    ({notes.length})
                </Text>
            </Heading>
            <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                {fullNotes.map((_, index) => (
                    <NotesCard key={index} />
                ))}
            </Grid>
            {remainderNotes.length > 0 && (
                <Grid templateColumns='repeat(2, 1fr)' gap={4} mt={4}>
                    {remainderNotes.map((_, index) => (
                        <NotesCard key={index} />
                    ))}
                </Grid>
            )}
            <Button
                className={styles.button}
                size='sm'
                alignSelf='center'
                mt={4}
                variant='ghost'
                _hover={{}}
                onClick={toggleShowAll}
            >
                Скрыть
            </Button>
        </VStack>
    );
};
