import { Button, Text, VStack } from '@chakra-ui/react';
import classNames from 'classnames';
import { useFieldArray, useFormContext } from 'react-hook-form';

import {} from '../../NewRecipePage';
import { RecipeFormValues } from '../../NewRecipeSchema';
import { CookStepCard } from '../cook-step-card/CookStepCard';
import { CustomPlus } from '../custom-plus/CustomPlus';
import styles from './CookStepsForm.module.css';

export const CookStepsForm = () => {
    const {
        control,
        register,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext<RecipeFormValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'steps',
    });

    return (
        <VStack gap={4}>
            <Text className={styles.title} letterSpacing={0} alignSelf='flex-start'>
                Добавьте шаги приготовления
            </Text>
            {fields.map((field, index) => (
                <CookStepCard
                    key={field.id}
                    watch={watch}
                    index={index}
                    setValue={setValue}
                    register={register}
                    errors={errors.steps?.[index]?.description}
                    removeStep={() => remove(index)}
                />
            ))}
            <Button
                className={classNames(styles.button, styles.border_color)}
                color='alpha.800'
                alignSelf='flex-end'
                size='sm'
                variant='outline'
                onClick={() =>
                    append({ stepNumber: fields.length + 1, image: '', description: '' })
                }
                rightIcon={
                    <CustomPlus
                        bg='alpha.800'
                        boxSize='14px'
                        colorIcon='white'
                        boxSizeIcon='8px'
                        type='div'
                        title=''
                    />
                }
            >
                Новый шаг
            </Button>
        </VStack>
    );
};
