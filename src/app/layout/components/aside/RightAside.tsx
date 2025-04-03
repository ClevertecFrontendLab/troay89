import { Button, GridItem, Image } from '@chakra-ui/react';

import IconStats from '../icon-stats/IconStats';
import addIcons from './../../../../assets/images/aside/rightAside/leftIcon.svg';
import styles from './RightAside.module.css';

function RightAside() {
    return (
        <GridItem className={styles.aside} as='aside'>
            <IconStats />
            <div className={styles['aside-container']}>
                <Button className={styles['aside-button']}>
                    <Image src={addIcons} />
                </Button>
                <span>Записать рецепт</span>
            </div>
        </GridItem>
    );
}

export default RightAside;
