import { Button, Text, VStack } from '@chakra-ui/react';
import classNames from 'classnames';

import { StepCook } from '../../NewRecipePage';
import { CookStepCard } from '../cook-step-card/CookStepCard';
import { CustomPlus } from '../custom-plus/CustomPlus';
import styles from './CookStepsForm.module.css';

type CookStepsFormProps = {
    cookSteps: StepCook[];
    addCookStep: () => void;
    handleCookStepChange: (index: number, changes: Partial<StepCook>) => void;
    fallback: string;
};

export const CookStepsForm = ({
    cookSteps,
    addCookStep,
    handleCookStepChange,
}: CookStepsFormProps) => (
    <VStack gap={4}>
        <Text className={styles.title} letterSpacing={0} alignSelf='flex-start'>
            Добавьте шаги приготовления
        </Text>
        {cookSteps.map((step, index) => (
            <CookStepCard
                key={index}
                index={index}
                step={step}
                handleCookStepChange={handleCookStepChange}
            />
        ))}
        <Button
            className={classNames(styles.button, styles.border_color)}
            color='alpha.800'
            alignSelf='flex-end'
            size='sm'
            variant='outline'
            onClick={addCookStep}
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
