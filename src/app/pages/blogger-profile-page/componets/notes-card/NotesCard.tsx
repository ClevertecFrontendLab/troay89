import { Card, Heading, Text } from '@chakra-ui/react';

import styles from './NotesCard.module.css';

export const NotesCard = () => (
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
            15 января 16:02
        </Heading>
        <Text className={styles.note}>
            Паназиатская кухня — это настоящий праздник для вашего здоровья и вкусовых рецепторов.
            Присоединяйтесь ко мне, и мы создадим новые кулинарные шедевры
        </Text>
    </Card>
);
