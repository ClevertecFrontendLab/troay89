import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';

import { useCreateLinkCard } from '~/hooks/useCreateLinkCard';
import { setIndexButton } from '~/store/slice/indexNavigationButtonSlice';
import { setIndexRecipe, setIndexTab } from '~/store/slice/indexTabsSlice';

import styled from './SimpleButton.module.css';

type SimpleButtonProps = {
    id: string;
    dataTestButton: string;
};

function SimpleButton({ id, dataTestButton }: SimpleButtonProps) {
    const dispatch = useDispatch();

    const { indexSubCat, indexCat, firstLink, secondLink, subcategories } = useCreateLinkCard({
        id: id,
    });

    function handlingClick() {
        dispatch(setIndexRecipe(id));
        if (subcategories === undefined) {
            dispatch(setIndexButton(indexCat));
            dispatch(setIndexTab(indexSubCat));
        }
    }

    return (
        <Button
            data-test-id={dataTestButton}
            className={`${styled.button} ${styled.extra}`}
            bg='blackAlpha.900'
            color='white'
            variant='solid'
            colorScheme='teal'
            px={{ bp95: '13px', base: 2 }}
            h={{ bp95: 8, base: 6 }}
            as={Link}
            to={subcategories === undefined ? firstLink : secondLink}
            onClick={handlingClick}
        >
            Готовить
        </Button>
    );
}

export default SimpleButton;
