import { useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react';

import { useGetBloggersQuery, useGetRecipesQuery } from '~/store/slice/api/api-slice';

import { BlogContentWithLoader } from './components/blog-content/BlogContent';

export const BlogPage = () => {
    const [isWide] = useMediaQuery('(min-width: 1601px)');
    const collapsedCount = isWide ? 9 : 8;
    const initialnumberAuthors = '9';
    const [limit, setLimit] = useState(initialnumberAuthors);
    const { data: swiperData, isLoading: isLoadingSwiper } = useGetRecipesQuery({
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'asc',
    });

    const {
        data: authors,
        isError: isErrorAuthors,
        isLoading: isLoadingAuthors,
    } = useGetBloggersQuery({ limit });
    const showAll = limit === 'all';

    const isPending = isLoadingSwiper || isLoadingAuthors;
    let authorsToShow;

    if (showAll) {
        if (authors && authors.others !== undefined) {
            authorsToShow = authors.others;
        } else {
            authorsToShow = undefined;
        }
    } else {
        if (authors && Array.isArray(authors.others)) {
            authorsToShow = authors.others.slice(0, collapsedCount);
        } else {
            authorsToShow = undefined;
        }
    }

    return (
        <BlogContentWithLoader
            isLoading={isPending}
            isErrorAuthors={isErrorAuthors}
            showAll={showAll}
            authorsToShow={authorsToShow}
            authors={authors}
            swiperData={swiperData}
            setLimit={setLimit}
        />
    );
};
