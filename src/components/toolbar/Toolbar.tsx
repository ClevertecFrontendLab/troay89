import { Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { listAllFiltersSelector } from '~/store/selectors/arrayResultFilterSelector';
import {
    fetchingFilterSelector,
    overlayPositionSelector,
} from '~/store/selectors/overlayPositionSelector';

import AllergenSort from '../allergen-sort/AllergenSort';
import { GreenTags } from '../green-tags/GreenTags';
import SearchFilter from '../search-filter/SearchFilter';
import styles from './Toolbar.module.css';

type ToolbarProps = {
    title: string | undefined;
    description?: string;
    isExtraSpace?: boolean;
    dateTestSwitch?: string;
    dataTestMenu?: string;
};

function Toolbar({
    title,
    description,
    isExtraSpace,
    dateTestSwitch = 'allergens-switcher',
    dataTestMenu = 'allergens-menu-button',
}: ToolbarProps) {
    const [listAllergin, setListAllergin] = useState<string[]>([]);
    const isFetchingFilterRecipes = useSelector(fetchingFilterSelector);
    const shouldShowOverlay = useSelector(overlayPositionSelector);
    const allChangeFilter = useSelector(listAllFiltersSelector);

    const isPending = isFetchingFilterRecipes && !shouldShowOverlay;

    return (
        <Flex
            className={`${styles.container} ${isExtraSpace && styles.extra_space}`}
            direction='column'
            minHeight={{ base: '80px', bp115: '248px' }}
        >
            <Flex className={styles.container_title}>
                <Heading className={styles.title} as='h1'>
                    {title}
                </Heading>
                {description && <Text className={styles.heading_description}>{description}</Text>}
            </Flex>

            {isPending ? (
                <Flex
                    w={{ base: '40px', bp115: '100px' }}
                    h={{ base: '40px', bp115: '100px' }}
                    align='center'
                    justify='center'
                    background='radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%);'
                >
                    <Spinner data-test-id='loader-search-block' />
                </Flex>
            ) : (
                <>
                    <SearchFilter listAllergin={listAllergin} />
                    <AllergenSort
                        dataTestSwitch={dateTestSwitch}
                        dataTest={dataTestMenu}
                        value={listAllergin}
                        onSelectionChange={(selectedAllergens) =>
                            setListAllergin(selectedAllergens)
                        }
                    />
                    {allChangeFilter && <GreenTags typeAll={allChangeFilter} />}
                </>
            )}
        </Flex>
    );
}

export default Toolbar;
