import { Box, Card, CardBody, Image, Textarea } from '@chakra-ui/react';
import { useState } from 'react';

import { fallback } from '~/assets/images/header';
import { FileLoadModal } from '~/components/modal/file-load/FileLoadModal';
import { URLS } from '~/constants/url';

import { StepCook } from '../../NewRecipePage';
import styles from './CookStepCard.module.css';

type CookStepCardProps = {
    index: number;
    step: StepCook;
    handleCookStepChange: (index: number, changes: Partial<StepCook>) => void;
};

export const CookStepCard = ({ index, step, handleCookStepChange }: CookStepCardProps) => {
    const [isShowModule, setIsShowModule] = useState(false);

    const handleImageLoaded = (url: string) => {
        handleCookStepChange(index, { urlImage: url });
        setIsShowModule(false);
    };

    return (
        <Card boxShadow='none' flexDirection='row'>
            <Image
                w='346px'
                h='160px'
                alt='место для загрузки изображения'
                background='alpha.200'
                fallbackSrc={fallback}
                objectPosition='center'
                objectFit={step.urlImage ? 'unset' : 'none'}
                src={step.urlImage ? `${URLS.IMAGE_URL}${step.urlImage}` : undefined}
                onClick={() => setIsShowModule(true)}
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
                    value={step.description}
                    onChange={(e) => handleCookStepChange(index, { description: e.target.value })}
                />
            </CardBody>
            {isShowModule && (
                <FileLoadModal
                    isOpen={isShowModule}
                    onClose={() => setIsShowModule(false)}
                    setloadImageUrl={handleImageLoaded}
                />
            )}
        </Card>
    );
};
