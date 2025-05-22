import { Avatar, Button, Card, CardBody, Flex, Heading, Icon, Text } from '@chakra-ui/react';

import { avatar } from '~/assets/images/cooking-step';
import PeopleEmpty from '~/components/icons/PeopleEmpty';
import Subscribe from '~/components/icons/Subscribe';

import styles from './AuthorCard.module.css';

export const AuthorCard = () => (
    <Card className={styles.card} direction='row' shadow='none'>
        <Avatar
            name={avatar}
            src={avatar}
            boxSize={24}
            my={{ base: 3, bp76: 6 }}
            ml={{ base: 3, bp76: 6 }}
        />
        <CardBody
            pl={{ base: 2, bp76: 4 }}
            pr={{ base: 2, bp76: 6 }}
            pt={{ base: 2, bp76: 6 }}
            pb={{ base: 3, bp76: 6 }}
        >
            <Flex
                justify='space-between'
                direction={{ base: 'column-reverse', bp76: 'row' }}
                mb={{ base: 0, bp76: 1 }}
            >
                <Heading className={styles.name} as='h2'>
                    Сергей Разумов
                </Heading>
                <Text className={styles.text} alignSelf={{ base: 'flex-end', bp76: 'unset' }}>
                    Автор рецепта
                </Text>
            </Flex>
            <Text className={styles.email} mb={4}>
                @serge25
            </Text>
            <Flex justify='space-between'>
                <Button
                    className={styles.button}
                    leftIcon={<Subscribe />}
                    colorScheme='teal'
                    size='xs'
                    bg='alpha.800'
                    color='white'
                    iconSpacing='6px'
                >
                    Подписаться
                </Button>
                <Flex className={styles.stats} align='center' gap='7px' mr={{ base: 2, bp76: 1 }}>
                    <Icon className={styles.icon} as={PeopleEmpty} boxSize={3} />
                    125
                </Flex>
            </Flex>
        </CardBody>
    </Card>
);
