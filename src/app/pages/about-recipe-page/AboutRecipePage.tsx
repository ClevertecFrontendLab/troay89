import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import TableIngredients from '~/app/pages/about-recipe-page/components/table-ingredients/TableIndegrients';

import AuthorCard from './components/author-card/AuthorCard';
import CaloricDish from './components/caloric-dish/CaloricDish';
import CardAboutRecipe from './components/card-about-recipe/CardAboutRecipe';
import CookingSteps from './components/cooking_steps/CookingSteps';
import NewBlock from './components/new-block/NewBlock';

function AboutRecipePage() {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    return (
        <Box px={{ base: 4, bp76: 0 }}>
            <CardAboutRecipe />
            <CaloricDish />
            <TableIngredients />
            <CookingSteps />
            <AuthorCard />
            <NewBlock />
        </Box>
    );
}

export default AboutRecipePage;
