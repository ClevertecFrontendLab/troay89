import * as Yup from 'yup';

export const recipeValidationSchema = Yup.object().shape({
    image: Yup.string().required(''),

    title: Yup.string().required('').max(50, ''),

    description: Yup.string().required('').max(500, ''),

    categoriesIds: Yup.array().of(Yup.string().required()).min(3, '').required('').defined(),

    portions: Yup.number().positive('').required(''),

    time: Yup.number().positive('').max(10000, '').required(''),

    ingredients: Yup.array()
        .of(
            Yup.object().shape({
                title: Yup.string().max(50, '').required(''),
                count: Yup.number().positive('').required(''),
                measureUnit: Yup.string().required(''),
            }),
        )
        .min(1, '')
        .required('')
        .defined(),

    steps: Yup.array()
        .of(
            Yup.object().shape({
                index: Yup.number().optional(),
                image: Yup.string().optional(),
                description: Yup.string().max(300, '').required(''),
            }),
        )
        .min(1, '')
        .required('')
        .defined(),
});

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
    title: string;
    image: string;
    categoriesIds: string[];
    description: string;
    portions: number;
    time: number;
    ingredients: IngredientType[];
    steps: StepCook[];
};

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DeepPartialExcept<T, K extends keyof T> = Pick<T, K> & DeepPartial<Omit<T, K>>;

export type DraftRecipeFormValues = DeepPartialExcept<RecipeFormValues, 'title'>;
