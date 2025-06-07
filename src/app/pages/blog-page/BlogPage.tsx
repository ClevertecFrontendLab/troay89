import { useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react';

import { useGetBloggersQuery, useGetRecipesQuery } from '~/store/slice/api/api-slice';

import { BlogContentWithLoader } from './companents/blog-content/BlogContent';

export const BlogPage = () => {
    const [isWide] = useMediaQuery('(min-width: 1601px)');
    const collapsedCount = isWide ? 9 : 8;
    const [limit, setLimit] = useState('9');
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
    const authorsToShow = showAll
        ? (authors?.others ?? undefined)
        : Array.isArray(authors?.others)
          ? authors.others.slice(0, collapsedCount)
          : undefined;
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
