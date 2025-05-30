import { FormControl, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { MultiSelect } from '~/components/multi-select/MultiSelect';

import { RecipeFormValues } from '../../NewRecipeSchema';
import { CustomPlus } from '../custom-plus/CustomPlus';
import { TrashButton } from '../trash-button/TrashButton';
import styles from './IngredientsForm.module.css';

export type Ingredient = {
    title: string;
    count: number;
    measureUnit: string;
};

type IngredientsFormProps = {
    dataMeasurements: string[];
};

export const IngredientsForm = ({ dataMeasurements }: IngredientsFormProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<RecipeFormValues>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ingredients',
    });

    return (
        <VStack gap={{ base: 2, bp76: 4 }} w={{ base: 'auto', bp76: '604px', bp115: '668px' }}>
            <HStack alignSelf='flex-start' mb={1} gap={{ base: '7px', bp76: '11px' }}>
                <Text className={styles.title} letterSpacing={0}>
                    Добавьте ингредиенты рецепта, нажав на
                </Text>
                <CustomPlus
                    bg='white'
                    boxSize='16px'
                    colorIcon='black'
                    boxSizeIcon='8px'
                    type='div'
                    title=''
                />
            </HStack>
            <HStack alignSelf='flex-start' mb={1} display={{ base: 'none', bp95: 'flex' }}>
                <Heading className={styles.heading} pl='24px'>
                    Ингредиент
                </Heading>
                <Heading className={styles.heading} pl='208px'>
                    Количество
                </Heading>
                <Heading className={styles.heading} pl='32px'>
                    Единица измерения
                </Heading>
            </HStack>
            {fields.map((field, index) => (
                <HStack
                    key={field.id}
                    gap={{ base: 3, bp115: 4 }}
                    w='100%'
                    flexWrap={{ base: 'wrap', bp115: 'nowrap' }}
                >
                    <FormControl
                        isInvalid={Boolean(errors.ingredients?.[index]?.title)}
                        w='fit-content'
                    >
                        <Input
                            className={styles.input}
                            w={{ base: '328px', bp76: '241px', bp115: '293px' }}
                            placeholder='Ингредиент'
                            {...register(`ingredients.${index}.title` as const)}
                        />
                    </FormControl>
                    <FormControl w='80px' isInvalid={Boolean(errors.ingredients?.[index]?.count)}>
                        <Controller
                            name={`ingredients.${index}.count`}
                            control={control}
                            defaultValue={0}
                            render={({ field }) => {
                                const displayValue = field.value === 0 ? '' : field.value;
                                return (
                                    <Input
                                        className={styles.input}
                                        w='80px'
                                        placeholder='100'
                                        value={displayValue}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                        }}
                                    />
                                );
                            }}
                        />
                    </FormControl>
                    <FormControl
                        isInvalid={Boolean(errors.ingredients?.[index]?.measureUnit)}
                        w='fit-content'
                    >
                        <Controller
                            name={`ingredients.${index}.measureUnit`}
                            control={control}
                            render={({ field }) => {
                                const handleMultiSelectChange = (selectedValue: string[]) => {
                                    console.log('Выбранное значение:', selectedValue);
                                    field.onChange(selectedValue[0]);
                                };

                                return (
                                    <MultiSelect
                                        widthMenu='215px'
                                        widthMenuMobile='192px'
                                        textPlaceHolder='Единица измерен...'
                                        listItem={dataMeasurements}
                                        value={field.value !== '' ? [field.value] : []}
                                        onSelectionChange={handleMultiSelectChange}
                                        isDisable={true}
                                        isSingleSelect={true}
                                        hasError={Boolean(errors.ingredients?.[index]?.measureUnit)}
                                    />
                                );
                            }}
                        />
                    </FormControl>
                    {index === fields.length - 1 ? (
                        <CustomPlus
                            onClick={() => append({ title: '', count: 0, measureUnit: '' })}
                            bg='black'
                            boxSize='32px'
                            colorIcon='white'
                            boxSizeIcon='14px'
                            type='button'
                            alignSelf='flex-end'
                            mb='4px'
                            title='Добавьте ингредиенты рецепта'
                        />
                    ) : (
                        <TrashButton
                            onClick={() => remove(index)}
                            title='Удалить ингредиенты рецепта'
                        />
                    )}
                </HStack>
            ))}
        </VStack>
    );
};
