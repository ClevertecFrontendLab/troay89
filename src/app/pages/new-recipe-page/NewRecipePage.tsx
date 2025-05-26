import { Button, ButtonGroup, VStack } from '@chakra-ui/react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { fallback } from '~/assets/images/header';
import { Pencil } from '~/components/icons/Pencil';
import { useGetMeasureUnitsQuery } from '~/store/slice/api/api-slice';

import { CookStepsForm } from './components/cook-steps-form/CookStepsForm';
import { IngredientsForm } from './components/ingredients-form/IngredientsForm';
import { RecipeInfo } from './components/recipe-info/RecipeInfo';
import styles from './NewRecipe.module.css';

type Ingredient = {
    ingredient: string;
    amount: string;
    measurement: string;
};

export type StepCook = {
    urlImage: string;
    description: string;
};

export const NewRecipePage = () => {
    const { data, isError, error } = useGetMeasureUnitsQuery();
    const [categories, setCategories] = useState<string[]>([]);
    const [measurements, setMeasurements] = useState<string[]>([]);
    const [recipeTitle, setRecipeTitle] = useState('');
    const [recipeDescription, setRecipeDescription] = useState('');
    const [servings, setServings] = useState(4);
    const [cookingTime, setCookingTime] = useState(30);
    const [dataMeasurements, setDataMeasurements] = useState<string[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([
        { ingredient: '', amount: '', measurement: '' },
    ]);
    const [cookSteps, setCookSteps] = useState<StepCook[]>([{ urlImage: '', description: '' }]);

    // const idUser = localStorage.getItem(STORAGE_KEY.DECODED_PAYLOAD);

    useEffect(() => {
        if (data) {
            const measurementNames = data.map(({ name }) => name);
            setDataMeasurements(measurementNames);
        } else if (isError) {
            console.log(error, NewRecipePage);
        }
    }, [data, error, isError]);

    const addIngredientBlock = () => {
        setIngredients((prev) => [...prev, { ingredient: '', amount: '', measurement: '' }]);
    };

    const addCookStep = () => {
        setCookSteps((prev) => [...prev, { urlImage: '', description: '' }]);
    };

    const deleteIngredientBlock = (index: number) => {
        setIngredients((prev) => prev.filter((_, i) => i !== index));
    };

    const handleCookStepChange = (index: number, changes: Partial<StepCook>) => {
        setCookSteps((prevSteps) => {
            const newSteps = [...prevSteps];
            newSteps[index] = { ...newSteps[index], ...changes };
            return newSteps;
        });
    };

    const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = { ...newIngredients[index], [field]: value };
        setIngredients(newIngredients);
    };

    const handlePublish = () => {
        const recipeData = {
            categories,
            recipeTitle,
            recipeDescription,
            servings,
            cookingTime,
            ingredients,
            cookSteps,
            measurements,
        };
        console.log('Собранные данные рецепта:', recipeData);
    };

    return (
        <VStack
            mt={14}
            gap={10}
            mb={8}
            as='form'
            onSubmit={(e) => {
                e.preventDefault();
                handlePublish();
            }}
        >
            <RecipeInfo
                categories={categories}
                setCategories={setCategories}
                recipeTitle={recipeTitle}
                setRecipeTitle={setRecipeTitle}
                recipeDescription={recipeDescription}
                setRecipeDescription={setRecipeDescription}
                servings={servings}
                setServings={setServings}
                cookingTime={cookingTime}
                setCookingTime={setCookingTime}
            />
            <IngredientsForm
                dataMeasurements={dataMeasurements}
                ingredients={ingredients}
                addIngredientBlock={addIngredientBlock}
                deleteIngredientBlock={deleteIngredientBlock}
                handleIngredientChange={handleIngredientChange}
                measurements={measurements}
                setMeasurements={setMeasurements}
            />
            <CookStepsForm
                cookSteps={cookSteps}
                addCookStep={addCookStep}
                handleCookStepChange={handleCookStepChange}
                fallback={fallback}
            />
            <ButtonGroup spacing={5}>
                <Button
                    className={classNames(styles.button, styles.border_color)}
                    letterSpacing='0.2px'
                    px='15px'
                    color='alpha.800'
                    size='lg'
                    variant='outline'
                    leftIcon={<Pencil boxSize='17px' />}
                >
                    Сохранить черновик
                </Button>
                <Button
                    className={styles.button}
                    letterSpacing='0.2px'
                    size='lg'
                    bg='alpha.900'
                    color='white'
                    colorScheme='teal'
                    type='submit'
                >
                    Опубликовать рецепт
                </Button>
            </ButtonGroup>
        </VStack>
    );
};
