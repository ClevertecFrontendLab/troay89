import { useParams } from 'react-router';

import {
    useGetBloggerQuery,
    useGetBloggersQuery,
    useGetRecipesByUserQuery,
} from '~/store/slice/api/api-slice';

import { BloggerProfileContentWithLoader } from './componets/blogger-profile-content/BloggerProfileContent';

export const BloggerProfilePage = () => {
    const { id } = useParams();

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
    } = useGetBloggersQuery({ limit: '' });

    const isPending = isLoadingBlogger || isLoadingRecipes || isLoadingBloggers;
    const hasError = isErrorBlogger || isErrorBloggers || isErrorRecipes;

    return (
        <BloggerProfileContentWithLoader
            isLoading={isPending}
            isPending={isPending}
            hasError={hasError}
            errorBlogger={errorBlogger}
            errorRecipes={errorRecipes}
            dataBlogger={dataBlogger}
            dataRecipes={dataRecipes}
            dataBloggers={dataBloggers}
        />
    );
};
