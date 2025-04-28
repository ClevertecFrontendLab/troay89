type Breadcrumb = {
    title: string;
    link?: string;
    onClick?: () => void;
};

export function getBreadcrumbs(
    pathname: string,
    category: string,
    subcategory: string,
    titleRecipe: string | undefined,
    pathCategory: string,
    pathSubcategory: string,
    pathFirstSubcategory: string,
    handleCrumbLink: () => void,
) {
    let breadcrumbs: Breadcrumb[] = [];

    if (pathname === '/') {
        breadcrumbs = [{ title: 'Главная', link: '/' }];
    } else if (pathname === '/the-juiciest') {
        breadcrumbs = [{ title: 'Главная', link: '/' }, { title: 'Самое сочное' }];
    } else if (pathname.startsWith('/recipes')) {
        const pathParts = pathname.split('/').filter(Boolean);

        if (pathParts.length === 3) {
            breadcrumbs = [
                { title: 'Главная', link: '/' },
                {
                    title: category,
                    link: `/recipes/${pathCategory}/${pathFirstSubcategory}`,
                    onClick: handleCrumbLink,
                },
                { title: subcategory },
            ];
        } else if (pathParts.length === 4) {
            breadcrumbs = [
                { title: 'Главная', link: '/' },
                {
                    title: category,
                    link: `/recipes/${pathCategory}/${pathFirstSubcategory}`,
                    onClick: handleCrumbLink,
                },
                { title: subcategory, link: `/recipes/${pathCategory}/${pathSubcategory}` },
                { title: titleRecipe ?? '' },
            ];
        }
    }

    return breadcrumbs;
}
