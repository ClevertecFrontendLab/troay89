import { Box, Button, Card, CardBody, Image, Text, Textarea, VStack } from '@chakra-ui/react';
import classNames from 'classnames';

import { fallback } from '~/assets/images/header';

import { CustomPlus } from '../custom-plus/customPlus';
import styles from './CookStepsForm.module.css';

type CookStepsFormProps = {
    cookSteps: string[];
    addCookStep: () => void;
    handleCookStepChange: (index: number, value: string) => void;
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
            <Card key={index} boxShadow='none' flexDirection='row'>
                <Image
                    w='346px'
                    h='160px'
                    alt='место для загрузки изображения'
                    background='alpha.200'
                    fallbackSrc={fallback}
                    objectFit='none'
                    objectPosition='center'
                />
                <CardBody
                    border='1px solid'
                    borderColor='alpha.200'
                    borderLeft='none'
                    w='322px'
                    py='19px'
                >
                    <Box
                        className={styles.step}
                        px='8px'
                        py='2px'
                        bg='alpha.100'
                        w='53px'
                        mb={4}
                        letterSpacing='0.3px'
                    >
                        Шаг {index + 1}
                    </Box>
                    <Textarea
                        className={styles.text_area}
                        placeholder='Шаг'
                        borderColor='alpha.200'
                        px='11px'
                        h='84px'
                        value={step}
                        onChange={(e) => handleCookStepChange(index, e.target.value)}
                    />
                </CardBody>
            </Card>
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
