import { Button, GridItem, Icon } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

import PencilSquare from '~/components/icons/PencilSquare';

import { IconStats } from '../icon-stats/IconStats';
import styles from './RightAside.module.css';

export const RightAside = () => {
    const location = useLocation();
    const pathNewRecipe = '/recipes/new-recipe';
    const showComponent = location.pathname !== pathNewRecipe;

    return (
        <GridItem className={styles.aside} as='aside'>
            {showComponent && (
                <>
                    <IconStats />
                    <div className={styles.aside_container}>
                        <Button
                            as={Link}
                            to={pathNewRecipe}
                            boxSize={12}
                            borderRadius='50%'
                            bg='black'
                            colorScheme='teal'
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
