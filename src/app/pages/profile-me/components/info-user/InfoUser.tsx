import { Avatar, Flex, Heading, HStack, Icon, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router';

import { BloggerStats } from '~/components/blogger-stats/BloggerStats';
import { Gear } from '~/components/icons/Gear';

import styles from './InfoUser.module.css';

type InfoUserProps = {
    firstName: string;
    secondName: string;
    email: string;
    totalBookmarks: number;
    totalSubscribers: number;
};

export const InfoUser = ({
    firstName,
    secondName,
    email,
    totalBookmarks,
    totalSubscribers,
}: InfoUserProps) => {
    const navigate = useNavigate();
    const [isWide] = useMediaQuery('(min-width: 760px)');
    const title = isWide ? (
        `${firstName} ${secondName}`
    ) : (
        <>
            {firstName} <br /> {secondName}
        </>
    );
    const ml = isWide ? '4px' : '0px';

    const handleClickGear = () => navigate('/profile/settings');

    return (
        <HStack
            gap={6}
            pt={4}
            pb={{ base: 4, bp95: 10 }}
            pos='fixed'
            zIndex={100}
            left={{ base: 0, bp144: 256 }}
            right={{ base: 0, bp144: 256 }}
            bg='white'
            flexDir={{ base: 'column', bp76: 'row' }}
        >
            <Avatar size={{ base: 'xl', bp95: '2xl' }} ml={{ base: 0, bp76: 5, bp144: 6 }} />
            <VStack alignItems={{ base: 'center', bp76: 'flex-start' }} gap={3}>
                <Heading
                    className={styles.title}
                    as='h1'
                    my={0}
                    textAlign={{ base: 'center', bp76: 'unset' }}
                >
                    {title}
                </Heading>
                <Text className={styles.email} alignSelf={{ base: 'center', bp76: 'unset' }}>
                    {email}
                </Text>
                <BloggerStats
                    bookmarksCount={totalBookmarks}
                    subscribersCount={totalSubscribers}
                    ml={ml}
                />
            </VStack>
            <Flex
                as={Link}
                to=''
                boxSize={12}
                justify='center'
                align='center'
                pos='absolute'
                top={4}
                right={0}
            >
                <Icon
                    as={Gear}
                    boxSize={6}
                    mr={{ base: '32px', bp76: '40px', bp95: '20px' }}
                    onClick={handleClickGear}
                />
            </Flex>
        </HStack>
    );
};
