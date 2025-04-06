import { Button, Card, Flex, Heading, Image } from '@chakra-ui/react';

import CardLongProps from '~/type/cardLongCardProps';

import styles from './LongCard.module.css';

function LongCard({ image, title }: CardLongProps) {
    return (
        <Card className={styles.container}>
            <Flex className={styles['title_container']}>
                <Image className={styles.image} src={image} />
                <Heading className={styles.title} as='h3'>
                    {title}
                </Heading>
            </Flex>
            <Button className={styles.button}>Готовить</Button>
        </Card>
    );
}

export default LongCard;
