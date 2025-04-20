import { Avatar, Button, Card, CardBody, Flex, Heading, Icon, Text } from '@chakra-ui/react';

import { avatar } from '~/assets/images/cooking-step';
import PeopleEmpty from '~/components/icons/PeopleEmpty';
import Subscribe from '~/components/icons/Subscribe';

import styles from './AuthorCard.module.css';

function AuthorCard() {
    return (
        <Card className={styles.card} direction='row' shadow='none'>
            <Avatar name={avatar} src={avatar} boxSize={24} my={6} ml={6} />
            <CardBody pl={4} pr={6} py={6}>
                <Flex justify='space-between' mb={1}>
                    <Heading className={styles.name} as='h2'>
                        Сергей Разумов
                    </Heading>
                    <Text className={styles.text}>Автор рецепта</Text>
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
                    <Flex className={styles.stats} align='center' gap='7px' mr='4px'>
                        <Icon className={styles.icon} as={PeopleEmpty} boxSize={3} />
                        125
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    );
}

export default AuthorCard;
