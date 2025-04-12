import {
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Heading,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react';

import FavoriteButton from '~/components/buttons/favorite-button/FavoriteButton';
import SimpleButton from '~/components/buttons/simple-button/SimpleButton';
import CardStats from '~/components/card-stats/CardStats';
import LabelTypeFood from '~/components/label-type-food/LabelTypeFood';
import StatsForCard from '~/components/stats-card/StatsForCard';
import UserRecommend from '~/components/user-recommend/UserRecommend';
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
    return (
        <Card className={styles['card_container']}>
            <Image className={styles.image} src={image} alt='Caffe Latte' />
            <Stack className={styles['card_content']} gap={0}>
                <CardBody className={styles['card_body']}>
                    <StatsForCard favorites={favorites} like={like} isMobile />
                    <CardStats label={label} like={like} favorites={favorites} yellow />
                    <Heading className={styles.subtitle} as='h3' noOfLines={{ base: 2, bp95: 1 }}>
                        {title}
                    </Heading>
                    <Text as='span' className={styles.description} noOfLines={3}>
                        {description}
                    </Text>
                </CardBody>
                <CardFooter className={styles['card_footer']}>
                    <ButtonGroup>
                        <FavoriteButton />
                        <SimpleButton />
                    </ButtonGroup>
                </CardFooter>
            </Stack>
            <LabelTypeFood label={label} yellow isMobile />
            {nameRecommend && (
                <UserRecommend nameRecommend={nameRecommend} avatarRecommend={avatarRecommend} />
            )}
        </Card>
    );
}

export default GeneraCard;
