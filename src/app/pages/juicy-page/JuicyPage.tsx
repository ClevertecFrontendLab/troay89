import { Divider } from '@chakra-ui/react';

import Toolbar from '~/components/toolbar/Toolbar';
import dataLongCard from '~/data/dataLongCardMain';
import dataSimpleCard from '~/data/dataSimpleCard';

import LastBlock from '../../../components/last-block/LastBlock';
import MainBlock from './components/main-block/MainBlock';

function JuicyPage() {
    const text =
        'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.';
    return (
        <>
            <Toolbar title='Самое сочное' />
            <MainBlock />
            <Divider />
            <LastBlock
                title='Веганская кухня'
                text={text}
                simpleCardArray={dataSimpleCard}
                longCardArray={dataLongCard}
                isChangeTable
            />
        </>
    );
}

export default JuicyPage;
