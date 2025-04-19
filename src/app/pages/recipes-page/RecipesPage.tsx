import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import LastBlock from '~/components/last-block/LastBlock';
import Toolbar from '~/components/toolbar/Toolbar';
import dataLongCardVegan from '~/data/dataLongCardVegan';
import dataPathCategory from '~/data/dataPathCategory';
import dataSimpleCardVegan from '~/data/dataSimpleCardVegan';
import { ApplicationState } from '~/store/configure-store';

import TabPanelNavigation from './components/tab-panel-navigation/TabPanelNavigation';

function RecipesPage() {
    const textToolbar =
        'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.';
    const textLastBlock =
        'Без них невозможно представить себе ни современную, ни традиционную  кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб - рецепты изделий из теста многообразны и невероятно популярны.';

    const [title, setTitle] = useState('');
    const { category } = useParams();
    const indexNavigationButton = useSelector(
        (state: ApplicationState) => state.indexNavigationButton.index,
    );

    useEffect(() => {
        if (category !== undefined && indexNavigationButton !== undefined) {
            const newTitle = Array.from(dataPathCategory.keys())[indexNavigationButton][0];
            setTitle(newTitle);
        }
    }, [category, indexNavigationButton]);

    return (
        <>
            <Toolbar title={title} description={textToolbar} />
            <TabPanelNavigation />
            <LastBlock
                title='Десерты, выпечка'
                text={textLastBlock}
                simpleCardArray={dataSimpleCardVegan}
                longCardArray={dataLongCardVegan}
            />
        </>
    );
}

export default RecipesPage;
