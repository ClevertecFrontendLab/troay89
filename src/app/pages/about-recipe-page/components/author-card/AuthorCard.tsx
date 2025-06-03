import { Avatar, Button, Card, CardBody, Flex, Heading, Icon, Text } from '@chakra-ui/react';

import { avatar } from '~/assets/images/cooking-step';
import PeopleEmpty from '~/components/icons/PeopleEmpty';
import Subscribe from '~/components/icons/Subscribe';
import { STORAGE_KEY } from '~/constants/storageKey';
import { useToggleSubscriptionMutation } from '~/store/slice/api/api-slice';
import { BloggerData } from '~/type/bloggerData';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';

import styles from './AuthorCard.module.css';

type AuthorCardProps = {
    bloggerData: BloggerData | undefined;
};

export const AuthorCard = ({ bloggerData }: AuthorCardProps) => {
    const [toggleSubscription] = useToggleSubscriptionMutation();
    const userId = localStorage.getItem(STORAGE_KEY.DECODED_PAYLOAD) ?? '';

    console.log(bloggerData, 'bloggerInfo');

    const handleToggleSubscription = async () => {
        try {
            if (!bloggerData) return;
            await toggleSubscription({
                toUserId: bloggerData?.bloggerInfo._id,
                fromUserId: userId,
            }).unwrap();
        } catch (error) {
            console.log(error);
            isFetchBaseQueryError(error);
        }
    };

    return (
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
                        {`${bloggerData?.bloggerInfo.firstName} ${bloggerData?.bloggerInfo.lastName}`}
                    </Heading>
                    <Text className={styles.text} alignSelf={{ base: 'flex-end', bp76: 'unset' }}>
                        Автор рецепта
                    </Text>
                </Flex>
                <Text className={styles.email} mb={4}>
                    {`@${bloggerData?.bloggerInfo.login}`}
                </Text>
                <Flex justify='space-between'>
                    <Button
                        className={styles.button}
                        leftIcon={<Subscribe />}
                        colorScheme='teal'
                        size='xs'
                        bg={bloggerData?.isFavorite ? 'white' : 'alpha.800'}
                        color={bloggerData?.isFavorite ? 'alpha.800' : 'white'}
                        iconSpacing='6px'
                        onClick={handleToggleSubscription}
                    >
                        {bloggerData?.isFavorite ? 'Вы подписаны' : 'Подписаться'}
                    </Button>
                    <Flex
                        className={styles.stats}
                        align='center'
                        gap='7px'
                        mr={{ base: 2, bp76: 1 }}
                    >
                        <Icon className={styles.icon} as={PeopleEmpty} boxSize={3} />
                        {bloggerData?.totalSubscribers}
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    );
};
