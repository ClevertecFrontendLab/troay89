import { Button, Grid, Heading, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { DATA_TEST_ID } from '~/constants/dataTestId';
import { Note } from '~/type/author';
import { getColSpan } from '~/utils/getColSpan';

import { NotesCard } from '../notes-card/NotesCard';
import styles from './NotesBlogger.module.css';

type NotesBloggerProps = {
    notes: Note[];
};

export const NotesBlogger = ({ notes }: NotesBloggerProps) => {
    const [showAll, setShowAll] = useState(false);
    const toggleShowAll = () => setShowAll((prev) => !prev);
    const [isWide] = useMediaQuery('(min-width: 761px)');
    const showCountCard = isWide ? 3 : 2;

    return (
        <VStack
            gap={0}
            bg='alpha.50'
            align='flex-start'
            id='notes'
            w='100%'
            px={{ base: 4, bp95: 6 }}
            pt={{ base: 4, bp95: 6 }}
            pb={4}
            mb={{ base: 8, bp95: 10 }}
            borderRadius='16px'
            data-test-id={DATA_TEST_ID.BLOG_NOTES_BOX}
        >
            <Heading
                as='h2'
                className={styles.title}
                pb={4}
                letterSpacing={{ base: '0.5px', bp95: '1.6px' }}
            >
                Заметки{' '}
                <Text
                    as='span'
                    className={styles.number}
                    color='alpha.600'
                    data-test-id={DATA_TEST_ID.BLOGGER_USER_NOTES_COUNT}
                >
                    ({notes.length})
                </Text>
            </Heading>

            <Grid
                data-test-id={DATA_TEST_ID.BLOGGER_USER_NOTES_GRID}
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    bp76: 'repeat(12, 1fr)',
                }}
                gap={4}
            >
                {notes.map((note, index) => {
                    const colSpan = getColSpan(index, notes.length);
                    return (
                        <NotesCard
                            key={index}
                            note={note}
                            showCard={showAll || index < showCountCard ? 'block' : 'none'}
                            gridColumn={{ bp76: `span ${colSpan.bp76}` }}
                        />
                    );
                })}
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
                    data-test-id={DATA_TEST_ID.BLOGGER_USER_NOTES_BUTTON}
                >
                    {showAll ? 'Свернуть' : 'Показать больше'}
                </Button>
            )}
        </VStack>
    );
};
