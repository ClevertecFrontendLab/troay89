import { ButtonGroup, Card, CardHeader, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';

import FavoriteButton from '~/components/buttons/favorite-button/FavoriteButton';
import SimpleButton from '~/components/buttons/simple-button/SimpleButton';
import CardStats from '~/components/card-stats/CardStats';
import LabelTypeFood from '~/components/label-type-food/LabelTypeFood';
import StatsForCard from '~/components/stats-card/StatsForCard';
import useLabelCategory from '~/hooks/useLabelCategory';

import styles from './GeneralCard.module.css';

type GeneraCardProps = {
    id: string;
    image: string;
    title: string;
    description: string;
    label: string[];
    favorites: number;
    like: number;
};

function GeneraCard({ id, image, title, description, label, favorites, like }: GeneraCardProps) {
    const { arrayCategory } = useLabelCategory({ categories: label });

    return (
        <Card className={styles.card_container}>
            <Image
                className={styles.image}
                src={image}
                alt={title}
                loading='lazy'
                w={{ base: '158px', bp95: '346px' }}
                h={{ base: '128px', bp95: '244px' }}
            />
            <Stack className={styles.card_content} gap={0}>
                <CardHeader className={styles.card_header}>
                    <Flex direction='column' gap='2px' display={{ base: 'none', bp95: 'flex' }}>
                        <CardStats
                            label={arrayCategory[0]}
                            like={like}
                            favorites={favorites}
                            yellow
                        />
                        {arrayCategory.map(
                            (item, index) =>
                                index !== 0 && <LabelTypeFood label={item} key={item} yellow />,
                        )}
                    </Flex>

                    <StatsForCard favorites={favorites} like={like} isMobile />
                </CardHeader>
                <Flex className={styles.card_body} direction='column' justify='end'>
                    <Heading className={styles.subtitle} as='h3' noOfLines={{ base: 2, bp95: 1 }}>
                        {title}
                    </Heading>
                    <Text as='span' className={styles.description} noOfLines={3}>
                        {description}
                    </Text>
                    <ButtonGroup className={styles.card_footer}>
                        <FavoriteButton />
                        <SimpleButton id={id} />
                    </ButtonGroup>
                </Flex>
            </Stack>
            <Flex
                direction='column'
                gap='2px'
                pos='absolute'
                top='8px'
                left='8px'
                display={{ base: 'flex', bp95: 'none' }}
            >
                {arrayCategory.map((item) => (
                    <LabelTypeFood key={item} label={item} yellow isMobile />
                ))}
            </Flex>
        </Card>
    );
}

export default GeneraCard;
