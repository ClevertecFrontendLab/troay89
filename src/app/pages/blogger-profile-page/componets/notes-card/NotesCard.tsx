import { Card, Heading, ResponsiveValue, Text } from '@chakra-ui/react';

import { DATA_TEST_ID } from '~/constants/dataTestId';
import { Note } from '~/type/author';
import { formatDate } from '~/utils/formatDate';

import styles from './NotesCard.module.css';

type NotesCardProps = {
    note: Note;
    showCard: 'none' | 'block';
    gridColumn?: ResponsiveValue<string>;
};

export const NotesCard = ({ note, showCard, gridColumn }: NotesCardProps) => (
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
    >
        <Heading className={styles.title} as='h3' data-test-id={DATA_TEST_ID.NOTES_CARD_DATE}>
            {formatDate(note.date ?? '2025-03-26T15:27:16.066Z')}
        </Heading>
        <Text className={styles.note} data-test-id={DATA_TEST_ID.NOTES_CARD_TEXT}>
            {note.text}
        </Text>
    </Card>
);
