import { Card, Heading, Text } from '@chakra-ui/react';

import { CardStats } from '~/components/card-stats/CardStats';
import { Category } from '~/type/category';

import styles from './SimpleCard.module.css';

type SimpleCardType = {
    _id: string;
    title: string;
    description: string;
    bookmarks: number;
    likes: number;
    category?: Category;
};

export const SimpleCard = ({ title, description, category, bookmarks, likes }: SimpleCardType) => (
    <Card className={styles.container}>
        <Heading
            className={styles.title}
            as='h3'
            title={title}
            isTruncated
            maxW={{ base: '315px', bp76: '210px', bp95: '260px', bp189: '274px' }}
        >
            {title}
        </Heading>
        <Text className={styles.content} noOfLines={3}>
            {description}
        </Text>
        {category && (
            <CardStats
                title={category.title}
                icon={category.icon}
                like={likes}
                favorites={bookmarks}
                yellow
                isMobile
            />
        )}
    </Card>
);
