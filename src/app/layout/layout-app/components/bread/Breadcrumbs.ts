import { BREADCRUMBS } from '~/constants/breadcrumb';

type Breadcrumb = {
    title: string | undefined;
    link?: string;
    onClick?: () => void;
};

export function getBreadcrumbs(
    pathname: string,
    category: string,
    pathCategory: string,
    handleCrumbLink: () => void,
    titleRecipe: string | null,
    subcategory?: string,
    pathSubcategory?: string,
    pathFirstSubcategory?: string,
) {
    let breadcrumbs: Breadcrumb[] = [];

    if (pathname === '/') {
        breadcrumbs = [{ title: BREADCRUMBS.HOME_PAGE_TITLE, link: BREADCRUMBS.HOME_PAGE_PATH }];
    } else if (pathname === BREADCRUMBS.THE_JUICIEST_PATH) {
        breadcrumbs = [
            { title: BREADCRUMBS.HOME_PAGE_TITLE, link: BREADCRUMBS.HOME_PAGE_PATH },
            { title: BREADCRUMBS.THE_JUICIEST_TITLE },
        ];
    } else if (pathname.startsWith(BREADCRUMBS.THE_JUICIEST_PATH + '/')) {
        const pathParts = pathname.split('/').filter(Boolean);

        if (pathParts.length === 2) {
            breadcrumbs = [
                { title: BREADCRUMBS.HOME_PAGE_TITLE, link: BREADCRUMBS.HOME_PAGE_PATH },
                { title: BREADCRUMBS.THE_JUICIEST_TITLE, link: BREADCRUMBS.THE_JUICIEST_PATH },
                { title: titleRecipe ?? '' },
            ];
        }
    } else if (pathname === `${BREADCRUMBS.RECIPES}/${BREADCRUMBS.NEW_RECIPE_PATH}`) {
        breadcrumbs = [
            { title: BREADCRUMBS.HOME_PAGE_TITLE, link: BREADCRUMBS.HOME_PAGE_PATH },
            { title: BREADCRUMBS.NEW_RECIPE_TITLE },
        ];
    } else if (
        pathname.startsWith(BREADCRUMBS.RECIPES) ||
        pathname.startsWith(BREADCRUMBS.EDIT_RECIPE)
    ) {
        const pathParts = pathname.split('/').filter(Boolean);

        if (pathParts.length === 3) {
            breadcrumbs = [
                { title: BREADCRUMBS.HOME_PAGE_TITLE, link: BREADCRUMBS.HOME_PAGE_PATH },
                {
                    title: category,
                    link: `${BREADCRUMBS.RECIPES}/${pathCategory}/${pathFirstSubcategory}`,
                    onClick: handleCrumbLink,
                },
                { title: subcategory },
            ];
        } else if (pathParts.length === 4) {
            breadcrumbs = [
                { title: BREADCRUMBS.HOME_PAGE_TITLE, link: BREADCRUMBS.HOME_PAGE_PATH },
                {
                    title: category,
                    link: `${BREADCRUMBS.RECIPES}/${pathCategory}/${pathFirstSubcategory}`,
                    onClick: handleCrumbLink,
                },
                {
                    title: subcategory,
                    link: `${BREADCRUMBS.RECIPES}/${pathCategory}/${pathSubcategory}`,
                },
                { title: titleRecipe ?? '' },
            ];
        }
    }

    return breadcrumbs;
}
