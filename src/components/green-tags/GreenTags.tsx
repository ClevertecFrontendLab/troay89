import { Flex, Icon } from '@chakra-ui/react';

import CloseGreen from '../icons/CloseGreen';
import styles from './GreenTags.module.css';

type GreenTagTypes = {
    typeAll: string[];
    dataTestId?: string;
    handleRemoveTag?: (item: string) => void;
};

export const GreenTags = ({ typeAll, dataTestId, handleRemoveTag = () => {} }: GreenTagTypes) => (
    <Flex flexWrap='wrap' mt='auto' gap='16px' pt={2}>
        {typeAll &&
            typeAll.map((item) => (
                <Flex
                    key={item}
                    className={styles.label_change}
                    gap={2}
                    align='center'
                    data-test-id={dataTestId}
                >
                    {item}{' '}
                    <Icon
                        as={CloseGreen}
                        boxSize={2.5}
                        pointerEvents='auto'
                        onClick={() => handleRemoveTag(item)}
                    />
                </Flex>
            ))}
    </Flex>
);
