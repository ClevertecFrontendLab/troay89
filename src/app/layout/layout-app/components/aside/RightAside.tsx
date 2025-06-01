import { Button, GridItem, Icon } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

import PencilSquare from '~/components/icons/PencilSquare';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { URLS_PATH } from '~/constants/urlsPath';

import { IconStats } from '../icon-stats/IconStats';
import styles from './RightAside.module.css';

export const RightAside = () => {
    const location = useLocation();
    const showComponent =
        location.pathname !== URLS_PATH.NEW_RECIPE &&
        !location.pathname.startsWith(URLS_PATH.EDIT_RECIPE);

    return (
        <GridItem className={styles.aside} as='aside'>
            {showComponent && (
                <>
                    <IconStats />
                    <div className={styles.aside_container}>
                        <Button
                            as={Link}
                            to={URLS_PATH.NEW_RECIPE}
                            boxSize={12}
                            borderRadius='50%'
                            bg='black'
                            colorScheme='teal'
                            data-test-id={DATA_TEST_ID.ADD_RECIPE_BUTTON}
                        >
                            <Icon boxSize={6} as={PencilSquare} />
                        </Button>
                        <span>Записать рецепт</span>
                    </div>
                </>
            )}
        </GridItem>
    );
};
