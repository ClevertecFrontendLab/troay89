import { Button, Grid, Heading, HStack, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import classNames from 'classnames';
import { useState } from 'react';

import { PencilTwo } from '~/components/icons/PencilTwo';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { Note } from '~/type/author';
import { getColSpan } from '~/utils/getColSpan';

import { NotesCard } from '../notes-card/NotesCard';
import styles from './NotesBlogger.module.css';

type NotesBloggerProps = {
    notes: Note[];
    isMyNotes?: boolean;
};

export const NotesBlogger = ({ notes, isMyNotes }: NotesBloggerProps) => {
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
            pt={{ base: 4, bp95: isMyNotes ? 4 : 6 }}
            pb={4}
            mb={{ base: 8, bp95: 10 }}
            borderRadius='16px'
            data-test-id={DATA_TEST_ID.BLOG_NOTES_BOX}
        >
            <HStack justify='space-between' w='100%'>
                <Heading
                    as='h2'
                    className={classNames(styles.title, { [styles.my_notes]: isMyNotes })}
                    pb={notes.length ? 4 : 0}
                    letterSpacing={!isMyNotes ? { base: '0.5px', bp95: '1.6px' } : undefined}
                >
                    Заметки{' '}
                    <Text
                        as='span'
                        className={classNames(styles.number, { [styles.my_notes]: isMyNotes })}
                        color='alpha.600'
                        data-test-id={DATA_TEST_ID.BLOGGER_USER_NOTES_COUNT}
                    >
                        ({notes.length})
                    </Text>
                </Heading>
                <Button
                    size='sm'
                    className={styles.button}
                    leftIcon={<PencilTwo />}
                    bg='alpha.500'
                    variant='outline'
                    borderColor='alpha.600'
                >
                    Новая заметка
                </Button>
            </HStack>

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
