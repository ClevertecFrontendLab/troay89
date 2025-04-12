import { Button, GridItem, Icon } from '@chakra-ui/react';

import PencilSquare from '~/components/icons/PencilSquare';

import IconStats from '../icon-stats/IconStats';
import styles from './RightAside.module.css';

function RightAside() {
    return (
        <GridItem className={styles.aside} as='aside'>
            <IconStats />
            <div className={styles['aside_container']}>
                <Button boxSize={12} borderRadius='50%' bg='black' colorScheme='blackAlpha'>
                    <Icon boxSize={6} as={PencilSquare} />
                </Button>
                <span>Записать рецепт</span>
            </div>
        </GridItem>
    );
}

export default RightAside;
