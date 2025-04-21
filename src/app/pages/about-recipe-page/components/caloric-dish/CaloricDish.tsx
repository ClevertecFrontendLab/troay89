import { Box, Flex, Text } from '@chakra-ui/react';

import styles from './CaloricDish.module.css';

function CaloricDish() {
    return (
        <Box mb={{ base: 6, bp95: 10 }}>
            <Text className={styles.note}>* Калорийность на 1 порцию</Text>
            <Flex
                gap={{ base: 3, bp160: 6 }}
                justify='center'
                direction={{ base: 'column', bp76: 'row' }}
            >
                <Flex className={styles.container}>
                    <Text className={styles.type}>калорийность</Text>
                    <Text className={styles.count}>358</Text>
                    <Text className={styles.unit}>ККАЛ</Text>
                </Flex>
                <Flex className={styles.container}>
                    <Text className={styles.type}>белки</Text>
                    <Text className={styles.count}>23</Text>
                    <Text className={styles.unit}>ГРАММ</Text>
                </Flex>
                <Flex className={styles.container}>
                    <Text className={styles.type}>жиры</Text>
                    <Text className={styles.count}>20</Text>
                    <Text className={styles.unit}>ГРАММ</Text>
                </Flex>
                <Flex className={styles.container}>
                    <Text className={styles.type}>углеводы</Text>
                    <Text className={styles.count}>54</Text>
                    <Text className={styles.unit}>ГРАММ</Text>
                </Flex>
            </Flex>
        </Box>
    );
}

export default CaloricDish;
