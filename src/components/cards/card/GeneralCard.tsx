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
import UserRecomend from '~/components/user-recomend/UserRecomend';
import CardProps from '~/type/cardProps';

import styles from './GeneraCard.module.css';

function GeneraCard({
    image,
    title,
    description,
    label,
    favorites,
    like,
    nameRecomend,
    avatarRecomend,
}: CardProps) {
    return (
        <Card className={styles['card_container']} direction={{ base: 'column', sm: 'row' }}>
            <Image className={styles.image} src={image} alt='Caffe Latte' />
            <Stack className={styles['card_content']} gap={0}>
                <CardBody className={styles['card_body']}>
                    <StatsForCard favorites={favorites} like={like} isMobile />
                    <CardStats label={label} like={like} favorites={favorites} yellow />
                    <Heading className={styles.subtitle} as='h3'>
                        {title}
                    </Heading>
                    <Text className={styles.description}>{description}</Text>
                </CardBody>
                <CardFooter className={styles['card_footer']}>
                    <ButtonGroup>
                        <FavoriteButton />
                        <SimpleButton />
                    </ButtonGroup>
                </CardFooter>
            </Stack>
            <LabelTypeFood label={label} yellow isMobile />
            {nameRecomend && (
                <UserRecomend nameRecomend={nameRecomend} avatarRecomend={avatarRecomend} />
            )}
        </Card>
    );
}

export default GeneraCard;
