type Breadcrumb = {
    title: string | undefined;
    link?: string;
    onClick?: () => void;
};

export function getBreadcrumbs(
    pathname: string,
    category: string,
    subcategory: string | undefined,
    titleRecipe: string | null,
    pathCategory: string,
    pathSubcategory: string | undefined,
    pathFirstSubcategory: string | undefined,
    handleCrumbLink: () => void,
) {
    let breadcrumbs: Breadcrumb[] = [];

    if (pathname === '/') {
        breadcrumbs = [{ title: 'Главная', link: '/' }];
    } else if (pathname === '/the-juiciest') {
        breadcrumbs = [{ title: 'Главная', link: '/' }, { title: 'Самое сочное' }];
    } else if (pathname.startsWith('/the-juiciest/')) {
        const pathParts = pathname.split('/').filter(Boolean);

        if (pathParts.length === 2) {
            breadcrumbs = [
                { title: 'Главная', link: '/' },
                { title: 'Самое сочное', link: '/the-juiciest' },
                { title: titleRecipe ?? '' },
            ];
        }
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
