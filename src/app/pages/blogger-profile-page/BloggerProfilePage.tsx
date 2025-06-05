import { VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import FilterSortBlock from '~/components/filter-sort-block/FilterSortBlock';
import { Overlay } from '~/components/overlay/Overlay';
import {
    useGetBloggerQuery,
    useGetBloggersQuery,
    useGetRecipesByUserQuery,
} from '~/store/slice/api/api-slice';
import { PaginationMeta } from '~/type/RecipeType';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';

import { CardProfileBlogger } from './componets/card-profile-blogger/CardProfileBlogger';
import { NotesBlogger } from './componets/notes-blogger/NotesBlogger';
import { OtherBloggers } from './componets/other-bloggers/OtherBloggers';

export const BloggerProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        data: dataBlogger,
        error: errorBlogger,
        isError: isErrorBlogger,
        isLoading: isLoadingBlogger,
    } = useGetBloggerQuery({ id: id ?? '' }, { skip: !id });
    const {
        data: dataRecipes,
        error: errorRecipes,
        isError: isErrorRecipes,
        isLoading: isLoadingRecipes,
    } = useGetRecipesByUserQuery({ id: id ?? '' }, { skip: !id });
    const {
        data: dataBloggers,
        isError: isErrorBloggers,
        isLoading: isLoadingBloggers,
    } = useGetBloggersQuery({ limit: '3' });

    const [page, setPage] = useState<number>(1);
    const limit = 8;
    const allRecipes = dataRecipes?.recipes ?? [];
    const slicedRecipes = allRecipes.slice(0, page * limit);

    const array = [1, 2, 3, 4, 5, 6, 7, 8];

    const isPending = isLoadingBlogger || isLoadingRecipes || isLoadingBloggers;
    const hasError = isErrorBlogger || isErrorBloggers || isErrorRecipes;

    useEffect(() => {
        if (window.location.hash && !isPending) {
            const id = window.location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [isPending]);

    useEffect(() => {
        if (
            (errorBlogger && isFetchBaseQueryError(errorBlogger) && errorBlogger.status === 404) ||
            (errorRecipes && isFetchBaseQueryError(errorRecipes) && errorRecipes.status === 404)
        ) {
            navigate('/not-found');
        } else if (hasError) {
            navigate('/', { state: { isErrorGetAuthor: true } });
        }
    }, [errorBlogger, errorRecipes, hasError, navigate]);

    if (isPending) {
        return <Overlay />;
    }

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
            <NotesBlogger notes={array} />
            <OtherBloggers authors={dataBloggers?.others ?? []} />
        </VStack>
    );
};
