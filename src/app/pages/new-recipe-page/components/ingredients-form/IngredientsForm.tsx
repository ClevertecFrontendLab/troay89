import { Heading, HStack, Input, Text, VStack } from '@chakra-ui/react';

import { MultiSelect } from '~/components/multi-select/MultiSelect';

import { CustomPlus } from '../custom-plus/customPlus';
import { TrashButton } from '../trash-button/TrashButton';
import styles from './IngredientsForm.module.css';

export type Ingredient = {
    ingredient: string;
    amount: string;
    measurement: string;
};

const dataMeasurements = ['г', 'кг', 'мл', 'л', 'шт'];

type IngredientsFormProps = {
    ingredients: Ingredient[];
    addIngredientBlock: () => void;
    measurements: string[];
    setMeasurements: (selected: string[]) => void;
    deleteIngredientBlock: (index: number) => void;
    handleIngredientChange: (index: number, field: keyof Ingredient, value: string) => void;
};

export const IngredientsForm = ({
    ingredients,
    addIngredientBlock,
    measurements,
    setMeasurements,
    deleteIngredientBlock,
    handleIngredientChange,
}: IngredientsFormProps) => (
    <VStack gap={4} minW='668px'>
        <HStack alignSelf='flex-start' mb={1}>
            <Text className={styles.title} letterSpacing={0}>
                Добавьте ингредиенты рецепта, нажав на{' '}
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
        <HStack alignSelf='flex-start' mb={1}>
            <Heading className={styles.heading} as='h2' pl='24px'>
                Ингредиент
            </Heading>
            <Heading className={styles.heading} as='h2' pl='208px'>
                Количество
            </Heading>
            <Heading className={styles.heading} as='h2' pl='32px'>
                Единица измерения
            </Heading>
        </HStack>
        {ingredients.map((item, index) => {
            const isLast = index === ingredients.length - 1;
            return (
                <HStack key={index} gap={4} w='100%'>
                    <Input
                        className={styles.input}
                        w='293px'
                        placeholder='Ингредиент'
                        value={item.ingredient}
                        onChange={(e) =>
                            handleIngredientChange(index, 'ingredient', e.target.value)
                        }
                    />
                    <Input
                        className={styles.input}
                        w='80px'
                        placeholder='100'
                        value={item.amount}
                        onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                    />
                    <MultiSelect
                        widthMenu='215px'
                        textPlaceHolder='Единица измерен...'
                        isDisable={true}
                        listItem={dataMeasurements}
                        value={measurements}
                        onSelectionChange={(selectedMeasurements) =>
                            setMeasurements(selectedMeasurements)
                        }
                    />
                    {isLast ? (
                        <CustomPlus
                            bg='black'
                            boxSize='32px'
                            colorIcon='white'
                            boxSizeIcon='14px'
                            type='button'
                            alignSelf='flex-end'
                            mb='4px'
                            title='Добавьте ингредиенты рецепта'
                            onClick={addIngredientBlock}
                        />
                    ) : (
                        <TrashButton
                            onClick={() => deleteIngredientBlock(index)}
                            title='Удалить ингредиенты рецепта'
                        />
                    )}
                </HStack>
            );
        })}
    </VStack>
);
