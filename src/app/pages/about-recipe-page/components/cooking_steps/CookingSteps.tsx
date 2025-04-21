import { Box, Card, CardBody, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { eight, four, one, six, three, two } from '~/assets/images/cooking-step';

import styles from './CookingSteps.module.css';

const steps = [
    {
        stepNumber: 1,
        description: 'Зелёный лук нарезать на 1 см. кружочки. Лук и чеснок на мелкие кубики.',
        image: one,
    },
    {
        stepNumber: 2,
        description:
            'Мясо помыть, высушить, нарезать на полосочки и обжарить на масле.  Посолить, поперчить и вынуть со сковороды.',
        image: two,
    },
    {
        stepNumber: 3,
        description: 'Спагетти отварить в течение  10 минут в подсоленной воде.',
        image: three,
    },
    {
        stepNumber: 4,
        description:
            'В сковороде, на оставшемся жире поджарить лук до золотистого цвета, добавить чеснок и прожарить ещё около 1 минуты.',
        image: four,
    },
    {
        stepNumber: 5,
        description: 'Всыпать шафран, корицу и муки, перемешать и коротко прожарить.',
        image: 'url',
    },
    {
        stepNumber: 6,
        description:
            'В сковороде, на оставшемся жире поджарить лук до золотистого цвета, добавить чеснок и прожарить ещё около 1 минуты.',
        image: six,
    },
    {
        stepNumber: 7,
        description:
            'Сливки смешать с бульоном, влить к луку и протушить на среднем огне около 10 минут.',
        image: 'url',
    },
    {
        stepNumber: 8,
        description:
            'Соус посолить, поперчить, вложить мясо, зелёный лук. Прогреть и осторожно смешать со спагетти. При подаче посыпать нарезанной петрушкой.',
        image: eight,
    },
];

function CookingSteps() {
    return (
        <Flex className={styles.container} direction='column' align='center' gap={5}>
            <Heading className={styles.subtitle} as='h2'>
                Шаги приготовления
            </Heading>
            {steps.map(({ stepNumber, description, image }, index) => (
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
                            className={`${styles.label} ${steps.length - 1 === index && styles.last_step}`}
                        >{`Шаг ${stepNumber}`}</Box>
                        <Text className={styles.description}>{description}</Text>
                    </CardBody>
                </Card>
            ))}
        </Flex>
    );
}

export default CookingSteps;
