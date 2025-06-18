import { HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import FilterSortBlock from '~/components/filter-sort-block/FilterSortBlock';
import { useGetMeQuery, useGetRecipesByUserQuery } from '~/store/slice/api/api-slice';
import { PaginationMeta } from '~/type/RecipeType';

import { NotesBlogger } from '../blogger-profile-page/componets/notes-blogger/NotesBlogger';
import { InfoUser } from './components/info-user/InfoUser';
import styles from './ProfileMe.module.css';

export const ProfileMe = () => {
    const { data: user } = useGetMeQuery();

    const userId = user?._id;

    const { data: dataRecipes } = useGetRecipesByUserQuery({ id: userId ?? '' }, { skip: !userId });

    const recipesUser = dataRecipes?.recipes ?? [];
    const draftsUser = user?.drafts ?? [];

    const draftCount = draftsUser.length;

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

    console.log(draftsUser, 'draftsUser');
    console.log(recipesUser, 'recipesUser');

    return (
        <VStack gap={0}>
            <InfoUser />
            <HStack
                mt={{ base: '260px', bp76: '132px', bp95: '184px' }}
                alignSelf='flex-start'
                gap={8}
                mb={4}
            >
                <Text className={styles.stats} letterSpacing='0.2px'>
                    Мои рецепты<Text as='span' color='alpha.600'>{` (${recipesUser.length})`}</Text>
                </Text>
                {draftCount && (
                    <Text className={styles.stats} letterSpacing='0.2px'>
                        Черновики<Text as='span' color='alpha.600'>{` (${draftCount})`}</Text>
                    </Text>
                )}
            </HStack>
            <FilterSortBlock
                filterSearchRecipes={slicedRecipes}
                page={page}
                meta={simulatedMeta}
                onLoadMore={handleLoadMoreFilter}
                isMyRecipe
            />
            <NotesBlogger notes={[]} isMyNotes={true} />
            <Text className={styles.stats} letterSpacing='0.2px' mb={4} alignSelf='flex-start'>
                Мои закладки
                <Text
                    as='span'
                    color='alpha.600'
                >{` (${dataRecipes?.myBookmarks?.length ?? 0})`}</Text>
            </Text>
            <FilterSortBlock
                filterSearchRecipes={dataRecipes?.myBookmarks ?? []}
                page={1}
                isMyBookmarks={true}
            />
        </VStack>
    );
};
