import { Box, Checkbox, Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import styles from './ListItemWithCheckBox.module.css';

type ListItemWithCheckBox = {
    title: string;
    selectedTitle: Map<string, string>;
    onSelectionChangeEng: (selected: string[]) => void;
    onSelectionChangeRus: (selected: string[]) => void;
};

function ListItemWithCheckBox({
    title,
    selectedTitle,
    onSelectionChangeEng,
    onSelectionChangeRus,
}: ListItemWithCheckBox) {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleOption = (rusValue: string) => {
        setSelected((prev) =>
            prev.includes(rusValue)
                ? prev.filter((item) => item !== rusValue)
                : [...prev, rusValue],
        );
    };

    useEffect(() => {
        const selectedEng = selected
            .map((rus) => selectedTitle.get(rus))
            .filter((eng): eng is string => eng !== undefined);
        onSelectionChangeEng(selectedEng);
        onSelectionChangeRus(selected);
    }, [selected, selectedTitle]);

    return (
        <Box>
            <Heading className={styles.subtitle} as='h3' mb={3}>
                {title}
            </Heading>
            <Flex direction='column' gap={3}>
                {[...selectedTitle.entries()].map(([rus, eng]) => (
                    <Flex
                        key={eng}
                        onClick={() => toggleOption(rus)}
                        alignItems='center'
                        data-test-id={`checkbox-${rus.toLocaleLowerCase()}`}
                    >
                        <Checkbox
                            className={styles.checkbox}
                            size='md'
                            mr={2}
                            isChecked={selected.includes(rus)}
                            pointerEvents='none'
                            borderColor='lime.400'
                        />
                        <Text className={styles.description}>{rus}</Text>
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
}

export default ListItemWithCheckBox;
