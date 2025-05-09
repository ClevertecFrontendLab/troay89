import { Button, Card, Flex, Heading, Image } from '@chakra-ui/react';

import { URLS } from '~/constants/url';

import styles from './LongCard.module.css';

type LongCard = {
    title: string;
    image?: string;
};

function LongCard({ image, title }: LongCard) {
    return (
        <Card className={styles.container}>
            <Flex className={styles.title_container}>
                <Image className={styles.image} src={`${URLS.IMAGE_URL}${image}`} />
                <Heading
                    className={styles.title}
                    as='h3'
                    isTruncated
                    maxW={{ base: '195px', bp76: '100px', bp95: '160px', bp189: '453px' }}
                >
                    {title}
                </Heading>
            </Flex>
            <Button className={styles.button}>Готовить</Button>
        </Card>
    );
}

export default LongCard;
