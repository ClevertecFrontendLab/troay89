import { Button, ButtonGroup, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import { Pencil } from '~/components/icons/Pencil';
import { useHandleError } from '~/hooks/useErrorHandler';
import { usePathCategoryData } from '~/hooks/usePathCategoryData';
import { useCreateRecipeMutation, useGetMeasureUnitsQuery } from '~/store/slice/api/api-slice';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';

import { CookStepsForm } from './components/cook-steps-form/CookStepsForm';
import { IngredientsForm } from './components/ingredients-form/IngredientsForm';
import { RecipeInfo } from './components/recipe-info/RecipeInfo';
import styles from './NewRecipe.module.css';
import { RecipeFormValues, recipeValidationSchema } from './NewRecipeSchema';

export const NewRecipePage = () => {
    const navigate = useNavigate();
    const [createRecipe] = useCreateRecipeMutation();
    const { data, isError, error } = useGetMeasureUnitsQuery();
    const [isOpenError, setIsOpenError] = useState(isError);
    const [title, setTitle] = useState('');
    const [notification, setNotification] = useState('');

    const handleError = useHandleError(setTitle, setNotification, 'login');

    const defaultValues: RecipeFormValues = {
        image: '',
        categoriesIds: [],
        title: '',
        description: '',
        portions: 4,
        time: 30,
        ingredients: [{ title: '', count: 0, measureUnit: '' }],
        steps: [{ stepNumber: 1, image: undefined, description: '' }],
    };

    const { keysPathCategory } = usePathCategoryData();

    const onSubmit = async (data: RecipeFormValues) => {
        const category = keysPathCategory.filter(({ title }) => data.categoriesIds.includes(title));
        const mappedCategoriesIds = category.map((category) => category?.subCategories?.[0]._id);
        const subcategory = category[0]?.subCategories?.[0].category;
        const payload = { ...data, categoriesIds: mappedCategoriesIds };

        if (Array.isArray(payload.steps)) {
            payload.steps = payload.steps.map((step) => {
                if (step.image === '') {
                    return { ...step, image: undefined };
                }
                return step;
            });
        }
        try {
            const response = await createRecipe(payload).unwrap();
            const link = `/recipes/${category[0].category}/${subcategory}/${response._id}`;
            navigate(link, { state: { showAlert: true } });
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                handleError(error);
                setIsOpenError(true);
            }
        }
    };

    const methods = useForm<RecipeFormValues>({
        defaultValues,
        resolver: yupResolver(recipeValidationSchema),
        mode: 'onSubmit',
    });

    const { handleSubmit } = methods;

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
            {isOpenError && (
                <ErrorModal
                    onClose={() => setIsOpenError(false)}
                    title={title}
                    notification={notification}
                />
            )}
        </FormProvider>
    );
};
