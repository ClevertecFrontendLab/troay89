import TableIngredients from '~/app/pages/about-recipe-page/components/table-ingredients/TableIndegrients';

import AuthorCard from './components/author-card/AuthorCard';
import CaloricDish from './components/caloric-dish/CaloricDish';
import CardAboutRecipe from './components/card-about-recipe/CardAboutRecipe';
import CookingSteps from './components/cooking_steps/CookingSteps';
import NewBlock from './components/new-block/NewBlock';

function AboutRecipePage() {
    return (
        <>
            <CardAboutRecipe />
            <CaloricDish />
            <TableIngredients />
            <CookingSteps />
            <AuthorCard />
            <NewBlock />
        </>
    );
}

export default AboutRecipePage;
