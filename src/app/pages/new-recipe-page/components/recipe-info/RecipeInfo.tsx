import {
    FormControl,
    FormLabel,
    HStack,
    Image,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Textarea,
    VStack,
} from '@chakra-ui/react';

import { fallback } from '~/assets/images/header';
import { MultiSelect } from '~/components/multi-select/MultiSelect';
import { dataCategory } from '~/data/dataCategory';

import styles from './RecipeInfo.module.css';

type RecipeInfoProps = {
    categories: string[];
    setCategories: (selected: string[]) => void;
    recipeTitle: string;
    setRecipeTitle: (title: string) => void;
    recipeDescription: string;
    setRecipeDescription: (desc: string) => void;
    servings: number;
    setServings: (num: number) => void;
    cookingTime: number;
    setCookingTime: (time: number) => void;
};

export const RecipeInfo = ({
    categories,
    setCategories,
    recipeTitle,
    setRecipeTitle,
    recipeDescription,
    setRecipeDescription,
    servings,
    setServings,
    cookingTime,
    setCookingTime,
}: RecipeInfoProps) => (
    <HStack alignItems='flex-start' w='100%' gap={6}>
        {/* <Input type="file" accept="image/*" /> */}
        <Image
            w='553px'
            h='410px'
            flexShrink={0}
            alt='место для загрузки изображения'
            background='alpha.200'
            fallbackSrc={fallback}
            objectFit='none'
            objectPosition='center'
        />
        <VStack w='100%' alignItems='flex-start' gap={6}>
            <FormControl display='flex' mb='8px'>
                <FormLabel className={styles.title} whiteSpace='nowrap' mb={0} my='auto' mr='84px'>
                    Выберите не менее 3-х тегов
                </FormLabel>
                <MultiSelect
                    widthMenu='350px'
                    textPlaceHolder='Выберите из списка...'
                    isDisable={true}
                    listItem={dataCategory}
                    value={categories}
                    onSelectionChange={(selectedCategories) => setCategories(selectedCategories)}
                />
            </FormControl>
            <Input
                className={styles.input}
                placeholder='Название рецепта'
                maxW='668px'
                size='lg'
                borderColor='lime.150'
                value={recipeTitle}
                onChange={(e) => setRecipeTitle(e.target.value)}
            />
            <Textarea
                className={styles.text_area}
                placeholder='Краткое описание рецепта'
                maxW='668px'
                px='11px'
                value={recipeDescription}
                onChange={(e) => setRecipeDescription(e.target.value)}
            />
            <FormControl display='flex' gap='13px'>
                <FormLabel className={styles.title} my='auto'>
                    На сколько человек ваш рецепт?
                </FormLabel>
                <NumberInput
                    className={styles.input}
                    value={servings}
                    w='90px'
                    onChange={(value) => setServings(Number(value))}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
            <FormControl display='flex' gap='12px'>
                <FormLabel className={styles.title} my='auto'>
                    Сколько времени готовить в минутах?
                </FormLabel>
                <NumberInput
                    className={styles.input}
                    value={cookingTime}
                    w='90px'
                    onChange={(value) => setCookingTime(Number(value))}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
        </VStack>
    </HStack>
);
