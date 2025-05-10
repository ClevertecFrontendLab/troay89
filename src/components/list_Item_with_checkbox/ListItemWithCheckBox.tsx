import { Box, Checkbox, Flex, Heading, Text } from '@chakra-ui/react';

import styles from './ListItemWithCheckBox.module.css';

type ListItemWithCheckBox = {
    title: string;
    selectedTitle: string[];
    value: string[];
    onSelectionChange: (selected: string[]) => void;
};

export const ListItemWithCheckBox = ({
    title,
    selectedTitle,
    value,
    onSelectionChange,
}: ListItemWithCheckBox) => {
    const toggleOption = (option: string) => {
        if (value.includes(option)) {
            onSelectionChange(value.filter((item) => item !== option));
        } else {
            onSelectionChange([...value, option]);
        }
    };

    return (
        <Box>
            <Heading className={styles.subtitle} as='h3' mb={3}>
                {title}
            </Heading>
            <Flex direction='column' gap={3}>
                {selectedTitle.map((title) => (
                    <Flex
                        key={title}
                        onClick={() => toggleOption(title)}
                        alignItems='center'
                        data-test-id={`checkbox-${title.toLocaleLowerCase()}`}
                    >
                        <Checkbox
                            className={styles.checkbox}
                            size='md'
                            mr={2}
                            isChecked={value.includes(title)}
                            pointerEvents='none'
                            borderColor='lime.400'
                        />
                        <Text className={styles.description}>{title}</Text>
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
};
