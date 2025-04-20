import TableIngredients from '~/app/pages/about-recipe-page/components/table-ingredients/TableIndegrients';

import CaloricDish from './components/caloric-dish/CaloricDish';
import CardAboutRecipe from './components/card-about-recipe/CardAboutRecipe';

function AboutRecipePage() {
    return (
        <>
            <CardAboutRecipe />
            <CaloricDish />
            <TableIngredients />
        </>
    );
}

export default AboutRecipePage;
