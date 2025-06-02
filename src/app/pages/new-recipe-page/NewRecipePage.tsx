import { useParams } from 'react-router';

import {
    useCreateRecipeMutation,
    useGetMeasureUnitsQuery,
    useGetRecipeQuery,
    useSaveDraftMutation,
    useUpdateRecipeMutation,
} from '~/store/slice/api/api-slice';

import { NewRecipeContentWithLoader } from './components/content/NewRecipeContent';

export const NewRecipePage = () => {
    const { id } = useParams();

    const [createRecipe, { isLoading: isLoadingCreateRecipe }] = useCreateRecipeMutation();
    const [updateRecipe, { isLoading: isLoadingUpdateRecipe }] = useUpdateRecipeMutation();
    const [saveRecipeDraft, { isLoading: isLoadingRecipeDraft }] = useSaveDraftMutation();
    const { data: dataMeasurement, isLoading: isLoadingMeasureUnits } = useGetMeasureUnitsQuery();
    const { data: dataRecipe } = useGetRecipeQuery({ id }, { skip: !id });
    const isPending =
        isLoadingCreateRecipe ||
        isLoadingUpdateRecipe ||
        isLoadingRecipeDraft ||
        isLoadingMeasureUnits;
    return (
        <NewRecipeContentWithLoader
            isLoading={isPending}
            dataMeasurement={dataMeasurement}
            dataRecipe={dataRecipe}
            createRecipe={createRecipe}
            updateRecipe={updateRecipe}
            saveRecipeDraft={saveRecipeDraft}
        />
    );
};
