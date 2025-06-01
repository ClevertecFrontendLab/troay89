import { Button, ButtonGroup, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import { Pencil } from '~/components/icons/Pencil';
import { DraftSaveModal } from '~/components/modal/draft-save-modal/DraftSaveModal';
import { withLoader } from '~/components/with-loader/WithLoader';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { useHandleError } from '~/hooks/useErrorHandler';
import { usePathCategoryData } from '~/hooks/usePathCategoryData';
import { useUnsavedChangesWarning } from '~/hooks/useUnsavedChangesWarning';
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
    dataRecipe?: RecipeType;
    dataMeasurement?: MeasureUnitsResponse;
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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleError = useHandleError(setTitle, setNotification, 'new-recipe');
    const handleErrorDraft = useHandleError(setTitle, setNotification, 'draft');

    const defaultValues: RecipeFormValues = {
        image: '',
        categoriesIds: [],
        title: '',
        description: '',
        portions: 4,
        time: 30,
        ingredients: [{ title: '', count: 0, measureUnit: '' }],
        steps: [{ stepNumber: 1, image: null, description: '' }],
    };

    const methods = useForm<RecipeFormValues>({
        defaultValues,
        resolver: yupResolver(recipeValidationSchema),
        mode: 'onSubmit',
    });

    const { isDirty } = methods.formState;
    const { showModal, confirmNavigation, cancelNavigation } = useUnsavedChangesWarning(
        isDirty && !isSubmitting,
    );

    const handleSaveDraftModal = async () => {
        const isTitleValid = await methods.trigger('title');
        if (!isTitleValid) {
            cancelNavigation();
            return;
        }
        await handleSaveDraft();
    };

    const transformCategoriesForForm = (recipeCategoriesIds: string[]) => {
        const allSubcategories =
            keysPathCategory?.flatMap((category) => category.subCategories || []) || [];
        const filtered = allSubcategories.filter((cat) => recipeCategoriesIds.includes(cat._id));
        return filtered.map((cat) => cat.title);
    };

    const transformCategoriesFromForm = (selectedCategoryTitles: string[]) => {
        const allSubcategories =
            keysPathCategory?.flatMap((category) => category.subCategories || []) || [];
        const filtered = allSubcategories.filter((cat) =>
            selectedCategoryTitles.includes(cat.title),
        );
        const mappedCategoriesIds = filtered.map((cat) => cat._id);
        const category = keysPathCategory?.find((cat) => cat._id === filtered[0]?.rootCategoryId);
        const subcategory = filtered[0]?.category;
        return { mappedCategoriesIds, category, subcategory };
    };

    const transformStepsImages = (steps: RecipeFormValues['steps']) =>
        steps.map((step) => (step.image === '' ? { ...step, image: null } : step));

    useEffect(() => {
        if (isEditMode && dataRecipe) {
            const mappedCategoryTitles = transformCategoriesForForm(dataRecipe.categoriesIds);
            methods.reset({
                image: dataRecipe.image,
                categoriesIds: mappedCategoryTitles,
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
        setIsSubmitting(true);
        const { mappedCategoriesIds, category, subcategory } = transformCategoriesFromForm(
            data.categoriesIds,
        );
        const payload = { ...data, categoriesIds: mappedCategoriesIds };

        if (Array.isArray(payload.steps)) {
            payload.steps = transformStepsImages(payload.steps);
        }
        try {
            let response;
            if (isEditMode && id) {
                response = await updateRecipe({ id: id, data: payload }).unwrap();
            } else {
                response = await createRecipe(payload).unwrap();
            }
            const link = `/recipes/${category?.category}/${subcategory}/${response._id}`;
            navigate(link, { state: { showAlert: true } });
        } catch (error) {
            setIsSubmitting(false);
            if (isFetchBaseQueryError(error)) {
                setIsOpenError(true);
                handleError(error);
            }
        }
    };

    const handleSaveDraft = async () => {
        setIsSubmitting(true);
        const isTitleValid = await methods.trigger('title');
        if (!isTitleValid) {
            return;
        }
        const formData = methods.getValues();
        const transformedFormData = transformEmptyToUndefined(formData) as DraftRecipeFormValues;
        try {
            await saveRecipeDraft(transformedFormData).unwrap();
            navigate('/', { state: { showAlertDraft: true } });
        } catch (error) {
            setIsSubmitting(false);
            if (isFetchBaseQueryError(error)) {
                setIsOpenError(true);
                handleErrorDraft(error);
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
            <VStack
                mt={{ base: 4, bp115: 14 }}
                gap={{ base: 8, bp115: 10 }}
                mb={{ base: '12px', bp76: '44px', bp115: 8 }}
                as='form'
                onSubmit={handleSubmit(onSubmit)}
                mx={{ base: 4, bp76: 0 }}
                data-test-id={DATA_TEST_ID.RECIPE_FORM}
            >
                <RecipeInfo />
                <IngredientsForm dataMeasurements={dataMeasurements} />
                <CookStepsForm />
                <ButtonGroup
                    spacing={{ base: 0, bp76: 5 }}
                    flexDir={{ base: 'column', bp76: 'row' }}
                    justifyContent='center'
                    w='100%'
                >
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
                        w={{ base: '100%', bp75: 'unset' }}
                        mb={{ base: 5, bp76: 0 }}
                        data-test-id={DATA_TEST_ID.RECIPE_SAVE_DRAFT_BUTTON}
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
                        w={{ base: '100%', bp75: 'unset' }}
                        data-test-id={DATA_TEST_ID.RECIPE_PUBLISH_RECIPE_BUTTON}
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
            <DraftSaveModal
                isOpen={showModal}
                onClose={cancelNavigation}
                onSaveDraft={handleSaveDraftModal}
                onConfirm={confirmNavigation}
            />
        </FormProvider>
    );
};

export const NewRecipeContentWithLoader = withLoader(NewRecipeContent);
