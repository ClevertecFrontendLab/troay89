import { Button, ButtonGroup, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import { Pencil } from '~/components/icons/Pencil';
import { withLoader } from '~/components/with-loader/WithLoader';
import { useHandleError } from '~/hooks/useErrorHandler';
import { usePathCategoryData } from '~/hooks/usePathCategoryData';
import {
    useCreateRecipeMutation,
    useSaveDraftMutation,
    useUpdateRecipeMutation,
} from '~/store/slice/api/api-slice';
import { MeasureUnitsResponse } from '~/type/measureUnitsResponse';
import { RecipeType } from '~/type/RecipeType';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';
import { transformEmptyToUndefined } from '~/utils/transformEmptyToUndefined';

import {
    DraftRecipeFormValues,
    RecipeFormValues,
    recipeValidationSchema,
} from '../../NewRecipeSchema';
import { CookStepsForm } from '../cook-steps-form/CookStepsForm';
import { IngredientsForm } from '../ingredients-form/IngredientsForm';
import { RecipeInfo } from '../recipe-info/RecipeInfo';
import styles from './../../NewRecipe.module.css';

type NewRecipeContentType = {
    dataRecipe: RecipeType | undefined;
    dataMeasurement: MeasureUnitsResponse | undefined;
    updateRecipe: ReturnType<typeof useUpdateRecipeMutation>[0];
    createRecipe: ReturnType<typeof useCreateRecipeMutation>[0];
    saveRecipeDraft: ReturnType<typeof useSaveDraftMutation>[0];
};

export const NewRecipeContent = ({
    dataRecipe,
    dataMeasurement,
    updateRecipe,
    createRecipe,
    saveRecipeDraft,
}: NewRecipeContentType) => {
    const navigate = useNavigate();

    const { id } = useParams();
    const isEditMode = Boolean(id);

    const { keysPathCategory } = usePathCategoryData();

    const [isOpenError, setIsOpenError] = useState(false);
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

    useEffect(() => {
        if (isEditMode && dataRecipe) {
            const filteredCategories = keysPathCategory
                .map((category) => ({
                    ...category,
                    subCategories:
                        category.subCategories?.filter((sub) =>
                            dataRecipe.categoriesIds.includes(sub._id),
                        ) || [],
                }))
                .filter((category) => category.subCategories.length > 0)
                .map(({ title }) => title);

            methods.reset({
                image: dataRecipe.image,
                categoriesIds: filteredCategories,
                title: dataRecipe.title,
                description: dataRecipe.description,
                portions: dataRecipe.portions,
                time: Number(dataRecipe.time) || defaultValues.time,
                ingredients: dataRecipe.ingredients,
                steps: dataRecipe.steps,
            });
        }
    }, [isEditMode, dataRecipe]);

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
            let response;
            if (isEditMode && id) {
                response = await updateRecipe({ id: id, data: payload }).unwrap();
            } else {
                response = await createRecipe(payload).unwrap();
            }
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

    const handleSaveDraft = async () => {
        const isTitleValid = await methods.trigger('title');
        if (!isTitleValid) {
            return;
        }
        const formData = methods.getValues();
        const transformedFormData = transformEmptyToUndefined(formData) as DraftRecipeFormValues;
        console.log(transformedFormData);
        try {
            await saveRecipeDraft(transformedFormData).unwrap();
            navigate('/', { state: { showAlert: true } });
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                handleError(error);
                setIsOpenError(true);
            }
        }
    };

    const { handleSubmit } = methods;

    const [dataMeasurements, setDataMeasurements] = useState<string[]>([]);

    useEffect(() => {
        if (dataMeasurement) {
            const measurementNames = dataMeasurement.map(({ name }) => name);
            setDataMeasurements(measurementNames);
        }
    }, [dataMeasurement]);

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
                        type='button'
                        onClick={handleSaveDraft}
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

export const NewRecipeContentWithLoader = withLoader(NewRecipeContent);
