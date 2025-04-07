import LastBlock from '~/components/last-block/LastBlock';
import Toolbar from '~/components/toolbar/Toolbar';
import dataLongCardVegan from '~/data/dataLongCardVegan';
import dataSimpleCardVegan from '~/data/dataSimpleCardVegan';

import TabPanelNavigation from './components/tab-panel-navigation/TabPanelNavigation';

function VeganPage() {
    const textToolbar =
        'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.';
    const textLastBlock =
        'Без них невозможно представить себе ни современную, ни традиционную  кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб - рецепты изделий из теста многообразны и невероятно популярны.';
    return (
        <>
            <Toolbar title='Веганская кухня' description={textToolbar} />
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

export default VeganPage;
