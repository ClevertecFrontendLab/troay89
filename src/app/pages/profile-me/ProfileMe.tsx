import { HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import FilterSortBlock from '~/components/filter-sort-block/FilterSortBlock';
import { useGetMeQuery, useGetRecipesByUserQuery } from '~/store/slice/api/api-slice';
import { PaginationMeta } from '~/type/RecipeType';

import { NotesBlogger } from '../blogger-profile-page/componets/notes-blogger/NotesBlogger';
import { InfoUser } from './components/info-user/InfoUser';

export const ProfileMe = () => {
    const { data: user } = useGetMeQuery();

    const userId = user?._id;

    const { data: dataRecipes } = useGetRecipesByUserQuery({ id: userId ?? '' }, { skip: !userId });

    const recipesUser = dataRecipes?.recipes ?? [];
    const draftsUser = user?.drafts ?? [];

    const [page, setPage] = useState<number>(1);
    const limit = 8;
    const allRecipes = [...draftsUser, ...recipesUser];
    const slicedRecipes = allRecipes.slice(0, page * limit);

    const simulatedMeta: PaginationMeta | undefined = allRecipes
        ? {
              total: allRecipes.length,
              page,
              limit,
              totalPages: Math.ceil(allRecipes.length / limit),
          }
        : undefined;

    const handleLoadMoreFilter = () => {
        setPage((prev) => prev + 1);
    };

    return (
        <VStack gap={6}>
            <InfoUser />
            <HStack mt={{ base: '260px', bp76: '132px', bp95: '184px' }}>
                <Text>{`Мои рецепты (${recipesUser.length})`}</Text>
                <Text>{`Черновики (${draftsUser.length})`}</Text>
            </HStack>
            <FilterSortBlock
                filterSearchRecipes={slicedRecipes}
                page={page}
                meta={simulatedMeta}
                onLoadMore={handleLoadMoreFilter}
            />
            <NotesBlogger notes={[]} />
            <FilterSortBlock filterSearchRecipes={dataRecipes?.myBookmarks ?? []} page={1} />
        </VStack>
    );
};
