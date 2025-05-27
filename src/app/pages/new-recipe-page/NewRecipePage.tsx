import { Button, ButtonGroup, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Pencil } from '~/components/icons/Pencil';
import { usePathCategoryData } from '~/hooks/usePathCategoryData';
import { useGetMeasureUnitsQuery } from '~/store/slice/api/api-slice';

import { CookStepsForm } from './components/cook-steps-form/CookStepsForm';
import { IngredientsForm } from './components/ingredients-form/IngredientsForm';
import { RecipeInfo } from './components/recipe-info/RecipeInfo';
import styles from './NewRecipe.module.css';
import { recipeValidationSchema } from './NewRecipeSchema';

export type IngredientType = {
    title: string;
    count: number;
    measureUnit: string;
};

export type StepCook = {
    stepNumber?: number;
    image?: string;
    description: string;
};

export type RecipeFormValues = {
    image: string | null;
    categoriesIds: string[];
    recipeTitle: string;
    recipeDescription: string;
    portions: number;
    time: number;
    ingredients: IngredientType[];
    cookSteps: StepCook[];
};

export const NewRecipePage = () => {
    const defaultValues: RecipeFormValues = {
        image: '',
        categoriesIds: [],
        recipeTitle: '',
        recipeDescription: '',
        portions: 4,
        time: 30,
        ingredients: [{ title: '', count: 0, measureUnit: '' }],
        cookSteps: [{ stepNumber: 1, image: '', description: '' }],
    };

    const { keysPathCategory } = usePathCategoryData();

    const methods = useForm<RecipeFormValues>({
        defaultValues,
        resolver: yupResolver(recipeValidationSchema),
        mode: 'onSubmit',
    });

    const { handleSubmit } = methods;

    const { data, isError, error } = useGetMeasureUnitsQuery();
    const [dataMeasurements, setDataMeasurements] = useState<string[]>([]);

    // const idUser = localStorage.getItem(STORAGE_KEY.DECODED_PAYLOAD);

    useEffect(() => {
        if (data) {
            const measurementNames = data.map(({ name }) => name);
            setDataMeasurements(measurementNames);
        } else if (isError) {
            console.log(error, NewRecipePage);
        }
    }, [data, error, isError]);

    const onSubmit = (data: RecipeFormValues) => {
        const mappedCategoriesIds = keysPathCategory
            .filter(({ title }) => data.categoriesIds.includes(title))
            .map((category) => category._id);
        const payload = { ...data, categoriesIds: mappedCategoriesIds };
        console.log('Собранные данные рецепта:', payload);
    };

    return (
        <FormProvider {...methods}>
            <VStack mt={14} gap={10} mb={8} as='form' onSubmit={handleSubmit(onSubmit)}>
                <RecipeInfo />
                <IngredientsForm dataMeasurements={dataMeasurements} />
                <CookStepsForm />
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
        </FormProvider>
    );
};
