import Toolbar from '~/components/toolbar/Toolbar';

function VeganPage() {
    const text =
        'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.';
    return (
        <>
            <Toolbar title='Приятного аппетита!' description={text} />
        </>
    );
}

export default VeganPage;
