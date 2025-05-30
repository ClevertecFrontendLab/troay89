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
import { useEffect, useState } from 'react';
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
        watch,
        formState: { errors },
    } = useFormContext();
    const [isShowModule, setIsShowModule] = useState(false);
    const handleShowFileLoad = () => setIsShowModule(true);
    const [loaderImageUrl, setLoaderImageUrl] = useState('');

    const imageValue = watch('image');

    useEffect(() => {
        if (imageValue) {
            setLoaderImageUrl(imageValue);
        }
    }, [imageValue]);

    const handleImageLoaded = (url: string) => {
        setLoaderImageUrl(url);
        setValue('image', url, { shouldValidate: true });
    };

    return (
        <HStack
            alignItems='flex-start'
            gap={{ base: 4, bp115: 6 }}
            w={{ base: '100%', bp115: '100%' }}
            flexDir={{ base: 'column', bp76: 'row' }}
        >
            <FormControl
                w={{ base: '328px', bp76: '232px', bp115: '553px' }}
                isInvalid={!!errors.image}
                flexShrink={{ base: 0, bp160: 'unset', bp189: 0 }}
                mx={{ base: 'auto', bp76: 'unset' }}
            >
                <Image
                    w={{ base: '328px', bp76: '232px', bp115: '553px' }}
                    h={{ base: '224px', bp115: '410px' }}
                    flexShrink={0}
                    src={loaderImageUrl ? `${URLS.IMAGE_URL}${loaderImageUrl}` : undefined}
                    alt='место для загрузки изображения'
                    background='alpha.200'
                    fallbackSrc={fallback}
                    objectFit={loaderImageUrl ? 'unset' : 'none'}
                    objectPosition='center'
                    onClick={handleShowFileLoad}
                    border={errors.image ? '2px solid red' : 'none'}
                />
            </FormControl>
            <VStack w='100%' alignItems='flex-start' gap={{ base: 4, bp115: 6 }}>
                <FormControl
                    isInvalid={Boolean(errors.categoriesIds)}
                    display='flex'
                    mb={{ base: 0, bp115: '8px' }}
                >
                    <FormLabel
                        className={styles.title}
                        // whiteSpace='nowrap'
                        mb={0}
                        my='auto'
                        mr={{ base: '16px', bp76: '42px', bp115: '84px' }}
                    >
                        Выберите не менее&nbsp;3-х&nbsp;тегов
                    </FormLabel>
                    <Controller
                        name='categoriesIds'
                        control={control}
                        render={({ field }) => {
                            const handleSelectionChange = (selected: string[]) => {
                                field.onChange(selected);
                            };
                            return (
                                <MultiSelect
                                    widthMenu='350px'
                                    widthMenuMobile='196px'
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

                <FormControl
                    isInvalid={Boolean(errors.portions)}
                    display='flex'
                    gap={{ base: '4px', bp115: '13px' }}
                >
                    <FormLabel
                        className={styles.title}
                        my='auto'
                        w={{ base: '222px', bp55: 'auto' }}
                    >
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

                <FormControl
                    isInvalid={Boolean(errors.time)}
                    display='flex'
                    gap={{ base: '3px', bp115: '12px' }}
                >
                    <FormLabel
                        className={styles.title}
                        my='auto'
                        w={{ base: '222px', bp55: 'auto' }}
                    >
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
                        setLoadImageUrl={handleImageLoaded}
                    />
                )}
            </VStack>
        </HStack>
    );
};
