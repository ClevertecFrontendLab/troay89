import * as Yup from 'yup';

export const recipeValidationSchema = Yup.object().shape({
    image: Yup.string()
        .transform((value, originalValue) => (originalValue === null ? undefined : value))
        .notRequired()
        .default(''),
    recipeTitle: Yup.string().required('').max(50, ''),

    recipeDescription: Yup.string().required('').max(500, ''),

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

    cookSteps: Yup.array()
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
