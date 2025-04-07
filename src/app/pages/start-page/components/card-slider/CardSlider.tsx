import { Card, CardBody, Heading, Image, Stack } from '@chakra-ui/react';

import CardStats from '~/components/card-stats/CardStats';
import CardProps from '~/type/cardProps';

import styles from './CardSlider.module.css';

function CardSlider({ image, title, description, label, favorites, like }: CardProps) {
    return (
        <Card className={styles.card}>
            <CardBody className={styles['card_body']}>
                <Image className={styles['card_image']} src={image} alt={label} />
                <Stack className={styles.text}>
                    <Heading className={styles['title_card']} as='h3'>
                        {title}
                    </Heading>
                    <span className={styles['description_card']}>{description}</span>
                    <CardStats label={label} favorites={favorites} like={like} />
                </Stack>
            </CardBody>
        </Card>
    );
}

export default CardSlider;
