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

import CardProps from '~/type/cardProps';

import FavoriteButton from '../buttons/favorite-button/FavoriteButton';
import SimpleButton from '../buttons/simple-button/SimpleButton';
import CardStats from '../card-stats/CardStats';
import UserRecomend from '../user-recomend/UserRecomend';
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
            <Stack gap={0}>
                <CardBody className={styles['card_body']}>
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
            {nameRecomend && (
                <UserRecomend nameRecomend={nameRecomend} avatarRecomend={avatarRecomend} />
            )}
        </Card>
    );
}

export default GeneraCard;
