import { Card, Heading, Text } from '@chakra-ui/react';

import { Note } from '~/type/author';
import { formatDate } from '~/utils/formatDate';

import styles from './NotesCard.module.css';

type NotesCardProps = {
    note: Note;
};

export const NotesCard = ({ note }: NotesCardProps) => (
    <Card
        px='23px'
        pt='27px'
        pb='19px'
        gap={4}
        boxShadow='none'
        border='1px solid'
        borderColor='alpha.200'
        borderRadius='8px'
    >
        <Heading className={styles.title} as='h3'>
            {formatDate(note.date ?? '2025-03-26T15:27:16.066Z')}
        </Heading>
        <Text className={styles.note}>{note.text}</Text>
    </Card>
);
