import { Avatar, Flex, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { BloggerStats } from '~/components/blogger-stats/BloggerStats';
import { Gear } from '~/components/icons/Gear';

import styles from './InfoUser.module.css';

export const InfoUser = () => (
    <HStack
        gap={6}
        pt={4}
        pb={{ base: 4, bp95: 10 }}
        pos='fixed'
        zIndex={100}
        left={{ base: 0, bp144: 256 }}
        right={{ base: 0, bp144: 256 }}
        bg='white'
    >
        <Avatar size={{ base: 'xl', bp95: '2xl' }} ml={6} />
        <VStack alignItems='flex-start' gap={3}>
            <Heading className={styles.title} as='h1' my={0}>
                Екатерина Константинопольская
            </Heading>
            <Text className={styles.email}>@bake_and_pie</Text>
            <HStack
                gap={{ base: '63px', bp95: '52px' }}
                justify={{ base: 'space-between', bp76: 'unset' }}
                w={{ base: '100%' }}
                mb={{ base: 2, bp76: 0 }}
            >
                <BloggerStats bookmarksCount={87} subscribersCount={12} ml='4px' />
            </HStack>
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
            <Icon as={Gear} boxSize={6} mr='20px' />
        </Flex>
    </HStack>
);
