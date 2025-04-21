import { Card, CardBody, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';

import CardStats from '~/components/card-stats/CardStats';
import LabelTypeFood from '~/components/label-type-food/LabelTypeFood';
import StatsForCard from '~/components/stats-card/StatsForCard';
import useLabelCategory from '~/hooks/useLabelCategory';
import CardProps from '~/type/cardProps';

import styles from './CardSlider.module.css';

function CardSlider({ image, title, description, label, favorites, like }: CardProps) {
    const { arrayCategory } = useLabelCategory({ categories: label });

    return (
        <Card className={styles.card}>
            <CardBody className={styles.card_body}>
                <Image
                    className={styles.card_image}
                    src={image}
                    alt={label[0]}
                    w={{ base: '158px', bp95: '279px', bp189: '322px' }}
                    h={{ base: '128px', bp95: '230px' }}
                />
                <Stack className={styles.content}>
                    <Heading className={styles.title_card} as='h3' noOfLines={{ bp95: 1, base: 2 }}>
                        {title}
                    </Heading>
                    <Text className={styles.description_card} noOfLines={3}>
                        {description}
                    </Text>
                    <Flex direction='column' gap='2px' display={{ base: 'none', bp95: 'flex' }}>
                        <CardStats label={arrayCategory[0]} favorites={favorites} like={like} />
                        {arrayCategory.map(
                            (item, index) =>
                                index !== 0 && <LabelTypeFood label={item} key={item} />,
                        )}
                    </Flex>
                    <StatsForCard favorites={favorites} like={like} isMobile />
                </Stack>
                <Flex
                    direction='column'
                    gap='2px'
                    pos='absolute'
                    top='8px'
                    left='8px'
                    display={{ base: 'flex', bp95: 'none' }}
                >
                    {arrayCategory.map((item, index) => (
                        <LabelTypeFood key={index} label={item} yellow isMobile />
                    ))}
                </Flex>
            </CardBody>
        </Card>
    );
}

export default CardSlider;
