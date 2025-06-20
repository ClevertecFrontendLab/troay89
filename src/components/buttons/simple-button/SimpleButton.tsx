import { Button } from '@chakra-ui/react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router';

import { useCreateLinkCard } from '~/hooks/useCreateLinkCard';
import { setIndexRecipe, setNameRecipe } from '~/store/slice/indexCategoriesSubcategoriesSlice';

import styled from './SimpleButton.module.css';

type SimpleButtonProps = {
    _id: string;
    titleRecipe: string;
    dataTestButton: string;
};

export const SimpleButton = ({ _id, dataTestButton, titleRecipe }: SimpleButtonProps) => {
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
            className={classNames(styled.button, styled.extra)}
            bg='blackAlpha.900'
            color='white'
            variant='solid'
            colorScheme='teal'
            size={{ base: 'xs', bp95: 'sm' }}
            as={Link}
            to={pathButton}
            onClick={handlingClick}
        >
            Готовить
        </Button>
    );
};
