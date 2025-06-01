import { Box, Card, CardBody, FormControl, HStack, Icon, Image, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FieldError, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { fallback } from '~/assets/images/header';
import { Garbage } from '~/components/icons/Garbage';
import { FileLoadModal } from '~/components/modal/file-load/FileLoadModal';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { URLS } from '~/constants/url';

import { RecipeFormValues } from '../../NewRecipeSchema';
import styles from './CookStepCard.module.css';

type CookStepCardProps = {
    index: number;
    register: UseFormRegister<RecipeFormValues>;
    errors?: FieldError;
    setValue: UseFormSetValue<RecipeFormValues>;
    removeStep: () => void;
    watch: UseFormWatch<RecipeFormValues>;
};

export const CookStepCard = ({
    index,
    register,
    errors,
    setValue,
    removeStep,
    watch,
}: CookStepCardProps) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const handleImageLoaded = (url: string) => {
        setImageUrl(url);
        setValue(`steps.${index}.image`, url, { shouldValidate: false });
        setIsShowModal(false);
    };

    const imageValue = watch(`steps.${index}.image`);

    useEffect(() => {
        if (imageValue) {
            setImageUrl(imageValue);
        }
    }, [imageValue]);

    return (
        <Card boxShadow='none' flexDirection={{ base: 'column', bp76: 'row' }}>
            <Box data-test-id={DATA_TEST_ID.getRecipeStepImageBlock(index)}>
                <Image
                    w='346px'
                    h='160px'
                    alt='место для загрузки изображения'
                    background='alpha.200'
                    fallbackSrc={fallback}
                    objectPosition='center'
                    objectFit={imageUrl ? 'unset' : 'none'}
                    src={imageUrl ? `${URLS.IMAGE_URL}${imageUrl}` : undefined}
                    onClick={() => setIsShowModal(true)}
                    data-test-id={DATA_TEST_ID.getRecipeStepsImageBlockPreviewImage(index)}
                />
            </Box>
            <CardBody
                border='1px solid'
                borderColor='alpha.200'
                borderLeft={{ base: '1px solid alpha.200', bp76: 'none' }}
                borderTop={{ base: 'none', bp76: '1px solid alpha.200' }}
                w={{ base: 'auto', bp76: '258px', bp115: '322px' }}
                py='19px'
            >
                <HStack mb={4} justify='space-between'>
                    <Box
                        className={styles.step}
                        px='8px'
                        py='2px'
                        bg='alpha.100'
                        w='53px'
                        letterSpacing='0.3px'
                    >
                        Шаг {index + 1}
                    </Box>
                    {index !== 0 && (
                        <Icon
                            as={Garbage}
                            onClick={removeStep}
                            data-test-id={DATA_TEST_ID.getRecipeStepsRemoveButton(index)}
                            cursor='pointer'
                        />
                    )}
                </HStack>
                <FormControl isInvalid={Boolean(errors)}>
                    <Textarea
                        className={styles.text_area}
                        placeholder='Шаг'
                        border={errors ? '2px solid' : '1px solid'}
                        borderColor={errors ? 'red.500' : 'alpha.200'}
                        px='11px'
                        h={{ base: '116px', bp76: '84px' }}
                        {...register(`steps.${index}.description`, {
                            required: 'Обязательное поле',
                            maxLength: {
                                value: 300,
                                message: 'Описание шага не более 300 символов',
                            },
                        })}
                        _focus={{
                            borderColor: errors ? 'red.500' : 'alpha.200',
                            boxShadow: 'none',
                        }}
                        _invalid={{
                            boxShadow: 'none',
                        }}
                        data-test-id={DATA_TEST_ID.getRecipeStepDescription(index)}
                    />
                </FormControl>
                <input type='hidden' {...register(`steps.${index}.image`)} value={imageUrl} />
            </CardBody>
            {isShowModal && (
                <FileLoadModal
                    isOpen={isShowModal}
                    onClose={() => setIsShowModal(false)}
                    setLoadImageUrl={handleImageLoaded}
                    defaultImageUrl={imageUrl}
                    dataTestId={DATA_TEST_ID.getRecipeStepImageBlockInputFile(index)}
                />
            )}
        </Card>
    );
};
