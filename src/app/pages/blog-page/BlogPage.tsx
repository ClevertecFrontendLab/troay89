import { Flex } from '@chakra-ui/react';

import { useGetBloggersQuery, useGetRecipesQuery } from '~/store/slice/api/api-slice';

import { NewBlock } from '../about-recipe-page/components/new-block/NewBlock';

export const BlogPage = () => {
    const { data: swiperData } = useGetRecipesQuery({
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'asc',
    });

    const { data } = useGetBloggersQuery();
    console.log(data, 'blogers');
    return (
        <>
            <h1>Кулинарные блоги</h1>
            <Flex></Flex>
            <Flex></Flex>
            {swiperData && <NewBlock swipeData={swiperData.data} />}
        </>
    );
};
