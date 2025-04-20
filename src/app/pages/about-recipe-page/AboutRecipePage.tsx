import TableIngredients from '~/app/pages/about-recipe-page/components/table-ingredients/TableIndegrients';

import AuthorCard from './components/author-card/AuthorCard';
import CaloricDish from './components/caloric-dish/CaloricDish';
import CardAboutRecipe from './components/card-about-recipe/CardAboutRecipe';
import CookingSteps from './components/cooking_steps/CookingSteps';
import JuicyBlock from './components/juicy-block/JuicyBlock';

function AboutRecipePage() {
    return (
        <>
            <CardAboutRecipe />
            <CaloricDish />
            <TableIngredients />
            <CookingSteps />
            <AuthorCard />
            <JuicyBlock />
        </>
    );
}

export default AboutRecipePage;
