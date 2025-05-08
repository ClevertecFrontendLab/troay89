import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router';

import { useCreateLinkCard } from '~/hooks/useCreateLinkCard';
import { setIndexRecipe, setNameRecipe } from '~/store/slice/indexCategorisSubcategoriesSlice';

import styled from './SimpleButton.module.css';

type SimpleButtonProps = {
    _id: string;
    titleRecipe: string;
    dataTestButton: string;
};

function SimpleButton({ _id, dataTestButton, titleRecipe }: SimpleButtonProps) {
    const location = useLocation();

    const dispatch = useDispatch();

    const { secondLink, subcategories } = useCreateLinkCard({ id: _id });

    function handlingClick() {
        dispatch(setIndexRecipe(_id));
        dispatch(setNameRecipe(titleRecipe));
    }

    const pathButton =
        subcategories === undefined
            ? `${location.pathname.startsWith('/the-juiciest') ? location.pathname.replace(/\/$/, '') : '/the-juiciest'}/${_id}`
            : secondLink;

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
            to={pathButton}
            onClick={handlingClick}
        >
            Готовить
        </Button>
    );
}

export default SimpleButton;
