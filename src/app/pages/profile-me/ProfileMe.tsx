import { HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { DrawerCreateNotes } from '~/components/drawer-notes/DrawerCreateNotes';
import FilterSortBlock from '~/components/filter-sort-block/FilterSortBlock';
import { useGetMeQuery, useGetRecipesByUserQuery } from '~/store/slice/api/api-slice';
import { setZIndex } from '~/store/slice/headerZIndex';
import { PaginationMeta } from '~/type/RecipeType';

import { NotesBlogger } from '../blogger-profile-page/componets/notes-blogger/NotesBlogger';
import { InfoUser } from './components/info-user/InfoUser';
import styles from './ProfileMe.module.css';

export const ProfileMe = () => {
    const { data: user } = useGetMeQuery();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();

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

    useEffect(() => {
        dispatch(setZIndex(isOpen));
    }, [dispatch, isOpen]);

    return (
        <VStack gap={0}>
            <InfoUser />
            <HStack
                mt={{ base: '260px', bp76: '132px', bp95: '184px' }}
                alignSelf='flex-start'
                gap={{ base: 4, bp95: 9 }}
                mb={{ base: 3, bp95: 4 }}
            >
                <Text className={styles.stats} letterSpacing='0.2px'>
                    Мои рецепты<Text as='span' color='alpha.600' fontWeight={400}>{` (15)`}</Text>
                </Text>
                {draftCount && (
                    <Text className={styles.stats} letterSpacing='0.2px'>
                        Черновики<Text as='span' color='alpha.600' fontWeight={400}>{` (2)`}</Text>
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
            <NotesBlogger
                notes={dataRecipes?.notes ?? []}
                isMyNotes={true}
                onOpen={onOpen}
                userId={userId}
            />
            <Text className={styles.stats} letterSpacing='0.2px' mb={4} alignSelf='flex-start'>
                Мои закладки
                <Text
                    as='span'
                    color='alpha.600'
                    fontWeight={400}
                >{` (${dataRecipes?.myBookmarks?.length ?? 0})`}</Text>
            </Text>
            <FilterSortBlock
                filterSearchRecipes={dataRecipes?.myBookmarks ?? []}
                page={1}
                isMyBookmarks={true}
            />
            <DrawerCreateNotes isOpen={isOpen} onClose={onClose} userId={userId} />
        </VStack>
    );
};
