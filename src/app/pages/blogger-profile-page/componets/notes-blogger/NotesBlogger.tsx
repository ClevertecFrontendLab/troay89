import { Button, Grid, Heading, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { Note } from '~/type/author';

import { NotesCard } from '../notes-card/NotesCard';
import styles from './NotesBlogger.module.css';

type NotesBloggerProps = {
    notes: Note[];
};

export const NotesBlogger = ({ notes }: NotesBloggerProps) => {
    const [showAll, setShowAll] = useState(false);
    const toggleShowAll = () => setShowAll((prev) => !prev);
    const [isWide] = useMediaQuery('(min-width: 761px)');

    if (!notes.length) {
        return null;
    }

    if (!showAll) {
        const initialNotes = isWide ? notes.slice(0, 3) : notes.slice(0, 2);
        return (
            <VStack
                gap={0}
                bg='alpha.50'
                id='notes'
                align='flex-start'
                px={{ base: 4, bp95: 6 }}
                pt={{ base: 4, bp95: 6 }}
                pb={4}
                mb={{ base: 8, bp95: 10 }}
                borderRadius='16px'
            >
                <Heading
                    as='h2'
                    className={styles.title}
                    pb={4}
                    letterSpacing={{ base: '0.5px', bp95: '1.6px' }}
                >
                    Заметки{' '}
                    <Text className={styles.number} as='span' color='alpha.600'>
                        ({notes.length})
                    </Text>
                </Heading>
                <Grid templateColumns={{ base: 'repeat(1, 1fr)', bp76: 'repeat(3, 1fr)' }} gap={4}>
                    {initialNotes.map((note, index) => (
                        <NotesCard key={index} note={note} />
                    ))}
                </Grid>
                {notes.length > 3 && (
                    <Button
                        className={styles.button}
                        size={{ base: 'xs', bp95: 'sm' }}
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
        <VStack
            gap={0}
            bg='alpha.50'
            align='flex-start'
            px={{ base: 4, bp95: 6 }}
            pt={{ base: 4, bp95: 6 }}
            pb={4}
            mb={{ base: 8, bp95: 10 }}
            borderRadius='16px'
        >
            <Heading
                as='h2'
                className={styles.title}
                pb={4}
                letterSpacing={{ base: '0.5px', bp95: '1.6px' }}
            >
                Заметки{' '}
                <Text as='span' className={styles.number} color='alpha.600'>
                    ({notes.length})
                </Text>
            </Heading>
            <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                {fullNotes.map((note, index) => (
                    <NotesCard key={index} note={note} />
                ))}
            </Grid>
            {remainderNotes.length > 0 && (
                <Grid templateColumns='repeat(2, 1fr)' gap={4} mt={4}>
                    {remainderNotes.map((note, index) => (
                        <NotesCard key={index} note={note} />
                    ))}
                </Grid>
            )}
            <Button
                className={styles.button}
                size={{ base: 'xs', bp95: 'sm' }}
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
