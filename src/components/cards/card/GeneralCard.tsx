import { ButtonGroup, Card, CardHeader, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import FavoriteButton from '~/components/buttons/favorite-button/FavoriteButton';
import SimpleButton from '~/components/buttons/simple-button/SimpleButton';
import CardStats from '~/components/card-stats/CardStats';
import LabelTypeFood from '~/components/label-type-food/LabelTypeFood';
import StatsForCard from '~/components/stats-card/StatsForCard';
import UserRecommend from '~/components/user-recommend/UserRecommend';
import dataPathCategory from '~/data/dataPathCategory';
import CardProps from '~/type/cardProps';

import styles from './GeneralCard.module.css';

function GeneraCard({
    image,
    title,
    description,
    label,
    favorites,
    like,
    avatarRecommend,
    nameRecommend,
}: CardProps) {
    const [arrayCategory, setArrayCategory] = useState<string[]>([]);

    useEffect(() => {
        const category = Array.from(dataPathCategory.keys());
        const array = category
            .map(([rus, eng]) => (label.includes(eng) ? rus : null))
            .filter((item) => item !== null);
        setArrayCategory(array);
    }, [label]);

    return (
        <Card className={styles.card_container}>
            <Image
                className={styles.image}
                src={image}
                alt='Caffe Latte'
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
                        <SimpleButton />
                    </ButtonGroup>
                </Flex>
            </Stack>
            <LabelTypeFood label={label[0]} yellow isMobile />
            {nameRecommend && (
                <UserRecommend nameRecommend={nameRecommend} avatarRecommend={avatarRecommend} />
            )}
        </Card>
    );
}

export default GeneraCard;
