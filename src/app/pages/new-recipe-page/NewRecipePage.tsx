import { Button, ButtonGroup, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { FormProvider, Resolver, useForm } from 'react-hook-form';

import { Pencil } from '~/components/icons/Pencil';
import { usePathCategoryData } from '~/hooks/usePathCategoryData';
import { useCreateRecipeMutation, useGetMeasureUnitsQuery } from '~/store/slice/api/api-slice';

import { CookStepsForm } from './components/cook-steps-form/CookStepsForm';
import { IngredientsForm } from './components/ingredients-form/IngredientsForm';
import { RecipeInfo } from './components/recipe-info/RecipeInfo';
import styles from './NewRecipe.module.css';
import { RecipeFormValues, recipeValidationSchema } from './NewRecipeSchema';

export const NewRecipePage = () => {
    const defaultValues: RecipeFormValues = {
        image: undefined,
        categoriesIds: [],
        title: '',
        description: '',
        portions: 4,
        time: 30,
        ingredients: [{ title: '', count: 0, measureUnit: '' }],
        steps: [{ stepNumber: 1, image: undefined, description: '' }],
    };

    const [createRecipe] = useCreateRecipeMutation();

    const { keysPathCategory } = usePathCategoryData();

    const methods = useForm<RecipeFormValues>({
        defaultValues,
        resolver: yupResolver(recipeValidationSchema) as Resolver<RecipeFormValues>,
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

    const onSubmit = async (data: RecipeFormValues) => {
        const mappedCategoriesIds = keysPathCategory
            .filter(({ title }) => data.categoriesIds.includes(title))
            .map((category) => category._id);

        const payload = { ...data, categoriesIds: mappedCategoriesIds };

        if (Array.isArray(payload.steps)) {
            payload.steps = payload.steps.map((step) => {
                if (step.image === '') {
                    return { ...step, image: undefined };
                }
                return step;
            });
        }

        console.log('Собранные данные рецепта:', payload);

        try {
            const result = await createRecipe(payload).unwrap();
            console.log('Рецепт успешно создан', result);
        } catch (error) {
            console.error('Ошибка при создании рецепта:', error);
        }
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
