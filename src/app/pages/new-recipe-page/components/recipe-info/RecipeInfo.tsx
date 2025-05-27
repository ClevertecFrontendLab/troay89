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
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { fallback } from '~/assets/images/header';
import { FileLoadModal } from '~/components/modal/file-load/FileLoadModal';
import { MultiSelect } from '~/components/multi-select/MultiSelect';
import { URLS } from '~/constants/url';
import { dataCategory } from '~/data/dataCategory';

import styles from './RecipeInfo.module.css';

export const RecipeInfo = () => {
    const {
        register,
        control,
        setValue,
        formState: { errors },
    } = useFormContext();
    const [isShowModule, setIsShowModule] = useState(false);
    const handleShowFileLoad = () => setIsShowModule(true);
    const [loadImageUrl, setloadImageUrl] = useState('');

    const handleImageLoaded = (url: string) => {
        setloadImageUrl(url);
        setValue('image', url, { shouldValidate: false });
    };

    return (
        <HStack alignItems='flex-start' w='100%' gap={6}>
            <Image
                w='553px'
                h='410px'
                flexShrink={0}
                src={loadImageUrl && `${URLS.IMAGE_URL}${loadImageUrl}`}
                alt='место для загрузки изображения'
                background='alpha.200'
                fallbackSrc={fallback}
                objectFit={loadImageUrl ? 'unset' : 'none'}
                objectPosition='center'
                onClick={handleShowFileLoad}
            />
            <VStack w='100%' alignItems='flex-start' gap={6}>
                <FormControl isInvalid={Boolean(errors.categoriesIds)} display='flex' mb='8px'>
                    <FormLabel
                        className={styles.title}
                        whiteSpace='nowrap'
                        mb={0}
                        my='auto'
                        mr='84px'
                    >
                        Выберите не менее 3-х тегов
                    </FormLabel>
                    <Controller
                        name='categoriesIds'
                        control={control}
                        render={({ field }) => {
                            const handleSelectionChange = (selected: string[]) => {
                                console.log('Выбранные теги:', selected);
                                field.onChange(selected);
                            };

                            return (
                                <MultiSelect
                                    widthMenu='350px'
                                    textPlaceHolder='Выберите из списка...'
                                    listItem={dataCategory}
                                    value={field.value}
                                    onSelectionChange={handleSelectionChange}
                                    isDisable={true}
                                    hasError={Boolean(errors.categoriesIds)}
                                />
                            );
                        }}
                    />
                </FormControl>

                <FormControl isInvalid={Boolean(errors.title)}>
                    <Input
                        className={styles.input}
                        placeholder='Название рецепта'
                        maxW='668px'
                        size='lg'
                        borderColor='lime.150'
                        {...register('title')}
                    />
                </FormControl>

                <FormControl isInvalid={Boolean(errors.description)}>
                    <Textarea
                        className={styles.text_area}
                        placeholder='Краткое описание рецепта'
                        maxW='668px'
                        px='11px'
                        {...register('description')}
                    />
                </FormControl>

                <FormControl isInvalid={Boolean(errors.portions)} display='flex' gap='13px'>
                    <FormLabel className={styles.title} my='auto'>
                        На сколько человек ваш рецепт?
                    </FormLabel>
                    <NumberInput defaultValue={4} className={styles.input} w='90px'>
                        <NumberInputField {...register('portions', { valueAsNumber: true })} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.time)} display='flex' gap='12px'>
                    <FormLabel className={styles.title} my='auto'>
                        Сколько времени готовить в минутах?
                    </FormLabel>
                    <NumberInput defaultValue={30} className={styles.input} w='90px'>
                        <NumberInputField {...register('time', { valueAsNumber: true })} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                {isShowModule && (
                    <FileLoadModal
                        isOpen={isShowModule}
                        onClose={() => setIsShowModule(false)}
                        setloadImageUrl={handleImageLoaded}
                    />
                )}
            </VStack>
        </HStack>
    );
};
