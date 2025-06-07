import { VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import FilterSortBlock from '~/components/filter-sort-block/FilterSortBlock';
import { withLoader } from '~/components/with-loader/WithLoader';
import { AuthorData } from '~/type/author';
import { BloggerData } from '~/type/bloggerData';
import { PaginationMeta } from '~/type/RecipeType';
import { RecipeBloger } from '~/type/responceGetRecipeBlogger';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';

import { CardProfileBlogger } from '../card-profile-blogger/CardProfileBlogger';
import { NotesBlogger } from '../notes-blogger/NotesBlogger';
import { OtherBloggers } from '../other-bloggers/OtherBloggers';

type BloggerProfileContentProps = {
    isPending: boolean;
    hasError: boolean;
    errorBlogger: unknown;
    errorRecipes: unknown;
    dataRecipes?: RecipeBloger;
    dataBlogger?: BloggerData;
    dataBloggers?: AuthorData;
};

const BloggerProfileContent = ({
    dataRecipes,
    isPending,
    errorBlogger,
    errorRecipes,
    hasError,
    dataBlogger,
    dataBloggers,
}: BloggerProfileContentProps) => {
    const navigate = useNavigate();

    const [page, setPage] = useState<number>(1);
    const limit = 8;
    const allRecipes = dataRecipes?.recipes ?? [];
    const slicedRecipes = allRecipes.slice(0, page * limit);

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
            (isFetchBaseQueryError(errorBlogger) && errorBlogger.status === 404) ||
            (isFetchBaseQueryError(errorRecipes) && errorRecipes.status === 404)
        ) {
            navigate('/not-found');
        } else if (hasError) {
            navigate('/', { state: { isErrorGetAuthor: true } });
        }
    }, [errorBlogger, errorRecipes, hasError, navigate]);

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
        <VStack gap={0} px={{ base: 4, bp76: 0 }}>
            <CardProfileBlogger dataBlogger={dataBlogger} />
            <FilterSortBlock
                filterSearchRecipes={slicedRecipes}
                page={page}
                meta={simulatedMeta}
                onLoadMore={handleLoadMoreFilter}
                isExtraSpace={true}
                mobileGap={3}
            />
            <NotesBlogger notes={dataBlogger?.bloggerInfo.notes ?? []} />
            <OtherBloggers authors={dataBloggers?.others ?? []} />
        </VStack>
    );
};

export const BloggerProfileContentWithLoader = withLoader(BloggerProfileContent);
