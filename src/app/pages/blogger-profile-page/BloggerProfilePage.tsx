import { VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import FilterSortBlock from '~/components/filter-sort-block/FilterSortBlock';
import {
    useGetBloggerQuery,
    useGetBloggersQuery,
    useGetRecipesByUserQuery,
} from '~/store/slice/api/api-slice';
import { PaginationMeta } from '~/type/RecipeType';

import { CardProfileBlogger } from './componets/card-profile-blogger/CardProfileBlogger';
import { NotesBloger } from './componets/notes-bloger/NotesBloger';
import { OtherBlogers } from './componets/other-blogers/OtherBlogers';

export const BloggerProfilePage = () => {
    const { id } = useParams();
    const { data: dataBlogger } = useGetBloggerQuery({ id: id ?? '' }, { skip: !id });
    const { data: dataRecipes } = useGetRecipesByUserQuery({ id: id ?? '' }, { skip: !id });
    const { data: dataBloggers } = useGetBloggersQuery({ limit: '3' });

    const [page, setPage] = useState<number>(1);
    const limit = 8;
    const allRecipes = dataRecipes?.recipes ?? [];
    const slicedRecipes = allRecipes.slice(0, page * limit);

    const array = [1, 2, 3, 4, 5, 6, 7, 8];

    const simulatedMeta: PaginationMeta | undefined = dataRecipes
        ? {
              total: dataRecipes.recipes.length,
              page,
              limit,
              totalPages: Math.ceil(dataRecipes.recipes.length / limit),
          }
        : undefined;

    const handleLoadMoreFilter = () => {
        setPage((prev) => prev + 1);
    };

    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, []);

    return (
        <VStack gap={0}>
            <CardProfileBlogger dataBlogger={dataBlogger} />
            <FilterSortBlock
                filterSearchRecipes={slicedRecipes}
                page={page}
                meta={simulatedMeta}
                onLoadMore={handleLoadMoreFilter}
                paddingTop='184px'
            />
            <NotesBloger notes={array} />
            <OtherBlogers authors={dataBloggers?.others ?? []} />
        </VStack>
    );
};
