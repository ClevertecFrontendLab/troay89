import { Card, Heading, Text } from '@chakra-ui/react';

import CardStats from '~/components/card-stats/CardStats';
import CardProps from '~/type/cardProps';

import styles from './SimpleCard.module.css';

function SimpleCard({ title, description, label, favorites, like }: CardProps) {
    return (
        <Card className={styles.container}>
            <Heading className={styles.title} as='h3'>
                {title}
            </Heading>
            <Text className={styles.content} noOfLines={3}>
                {description}
            </Text>
            <CardStats label={label} like={like} favorites={favorites} yellow />
        </Card>
    );
}

export default SimpleCard;
