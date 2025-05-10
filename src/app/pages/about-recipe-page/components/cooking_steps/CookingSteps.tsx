import { Box, Card, CardBody, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { fallback } from '~/assets/images/header';
import { URLS } from '~/constants/url';
import { Step } from '~/type/RecipeType';

import styles from './CookingSteps.module.css';

type CookingStepsType = {
    steps: Step[];
};

export const CookingSteps = ({ steps }: CookingStepsType) => (
    <Flex className={styles.container} direction='column' align='center' gap={5}>
        <Heading className={styles.subtitle} as='h2'>
            Шаги приготовления
        </Heading>
        {steps.map(({ stepNumber, description, image }, index) => (
            <Card key={stepNumber} className={styles.card} shadow='none' direction='row'>
                {image && (
                    <Image
                        src={`${URLS.IMAGE_URL}${image}`}
                        w={{ base: '158px', bp95: '346px' }}
                        h={{ base: '128px', bp95: '244px' }}
                        borderTopLeftRadius='8px'
                        borderBottomLeftRadius='8px'
                        background='alpha.200'
                        fallbackSrc={fallback}
                        objectFit='none'
                        objectPosition='center'
                    />
                )}
                <CardBody
                    className={`${styles.card_body} ${!image && styles.without_image}`}
                    pl={{ base: 2, bp95: 6 }}
                    pr={{ base: '7px', bp95: 6 }}
                >
                    <Box
                        className={`${styles.label} ${steps.length - 1 === index && styles.last_step}`}
                    >{`Шаг ${stepNumber}`}</Box>
                    <Text className={styles.description}>{description}</Text>
                </CardBody>
            </Card>
        ))}
    </Flex>
);
