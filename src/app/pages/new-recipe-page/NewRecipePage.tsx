import { Location, useLocation, useParams } from 'react-router';

import {
    useCreateRecipeMutation,
    useGetMeasureUnitsQuery,
    useGetMeQuery,
    useGetRecipeQuery,
    useSaveDraftMutation,
    useUpdateRecipeMutation,
} from '~/store/slice/api/api-slice';
import { RecipeType } from '~/type/RecipeType';

import { NewRecipeContentWithLoader } from './components/content/NewRecipeContent';

type LocationState = {
    from?: boolean;
};

export const NewRecipePage = () => {
    const { id } = useParams();
    const location = useLocation();
    const state = (location as Location<LocationState>).state;
    const isDraft = state?.from === true;

    const [createRecipe, { isLoading: isLoadingCreateRecipe }] = useCreateRecipeMutation();
    const [updateRecipe, { isLoading: isLoadingUpdateRecipe }] = useUpdateRecipeMutation();
    const [saveRecipeDraft, { isLoading: isLoadingRecipeDraft }] = useSaveDraftMutation();
    const { data: dataMeasurement, isLoading: isLoadingMeasureUnits } = useGetMeasureUnitsQuery();
    const { data: recipe } = useGetRecipeQuery({ id }, { skip: !id || isDraft });
    const { data: user, isLoading: meIsLoading } = useGetMeQuery(undefined, { skip: !isDraft });
    let draft;
    if (user) {
        draft = user.drafts.find(({ _id }) => _id === id);
    }
    const dataRecipe = draft ? (draft as RecipeType) : recipe;

    const isPending =
        isLoadingCreateRecipe ||
        isLoadingUpdateRecipe ||
        isLoadingRecipeDraft ||
        isLoadingMeasureUnits ||
        meIsLoading;

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
