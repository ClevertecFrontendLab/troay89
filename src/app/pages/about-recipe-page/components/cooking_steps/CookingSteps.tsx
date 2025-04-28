import { Box, Card, CardBody, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { useNavigationIndices } from '~/hooks/useNavigationIndices';

import styles from './CookingSteps.module.css';

function CookingSteps() {
    const { recipe } = useNavigationIndices();

    if (recipe === undefined) return;

    return (
        <Flex className={styles.container} direction='column' align='center' gap={5}>
            <Heading className={styles.subtitle} as='h2'>
                Шаги приготовления
            </Heading>
            {recipe.steps.map(({ stepNumber, description, image }, index) => (
                <Card key={stepNumber} className={styles.card} shadow='none' direction='row'>
                    {image !== 'url' && (
                        <Image
                            src={image}
                            w={{ base: '158px', bp95: '346px' }}
                            h={{ base: '128px', bp95: '244px' }}
                            borderTopLeftRadius='8px'
                            borderBottomLeftRadius='8px'
                        />
                    )}
                    <CardBody
                        className={`${styles.card_body} ${image === 'url' && styles.without_image}`}
                        pl={{ base: 2, bp95: 6 }}
                        pr={{ base: '7px', bp95: 6 }}
                    >
                        <Box
                            className={`${styles.label} ${recipe.steps.length - 1 === index && styles.last_step}`}
                        >{`Шаг ${stepNumber}`}</Box>
                        <Text className={styles.description}>{description}</Text>
                    </CardBody>
                </Card>
            ))}
        </Flex>
    );
}

export default CookingSteps;
