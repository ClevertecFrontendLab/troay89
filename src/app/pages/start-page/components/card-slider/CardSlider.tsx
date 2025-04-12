import { Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react';

import CardStats from '~/components/card-stats/CardStats';
import LabelTypeFood from '~/components/label-type-food/LabelTypeFood';
import StatsForCard from '~/components/stats-card/StatsForCard';
import CardProps from '~/type/cardProps';

import styles from './CardSlider.module.css';

function CardSlider({ image, title, description, label, favorites, like }: CardProps) {
    return (
        <Card className={styles.card}>
            <CardBody className={styles['card_body']}>
                <Image className={styles['card_image']} src={image} alt={label} />
                <Stack className={styles.content}>
                    <Heading
                        className={styles['title_card']}
                        as='h3'
                        noOfLines={{ bp95: 1, base: 2 }}
                    >
                        {title}
                    </Heading>
                    <Text className={styles['description_card']} noOfLines={3}>
                        {description}
                    </Text>
                    <CardStats label={label} favorites={favorites} like={like} />
                    <StatsForCard favorites={favorites} like={like} isMobile />
                </Stack>
                <LabelTypeFood label={label} isMobile />
            </CardBody>
        </Card>
    );
}

export default CardSlider;
