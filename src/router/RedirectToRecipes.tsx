import { Navigate, useParams } from 'react-router';

export const RedirectToRecipes = () => {
    const { category, subcategories, id } = useParams();
    return <Navigate replace to={`/recipes/${category}/${subcategories}/${id}`} />;
};
