import { Button, ButtonGroup } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { useBuildLinkRecipe } from '~/hooks/useBuildLinkRecipe';

import { FavoriteButton } from '../buttons/favorite-button/FavoriteButton';
import { RemoveBookmarkButton } from '../buttons/remove-nookmark-button/RemoveBookmarkButton';
import { SimpleButton } from '../buttons/simple-button/SimpleButton';
import styles from './RecipeActionButton.module.css';

export type RecipeActionButtonProps = {
    isDraft: boolean;
    id: string;
    titleRecipe: string;
    dataTestButton: string;
    categoriesIds: string[];
    isMyRecipe?: boolean;
    isMyBookmarks?: boolean;
};

export const RecipeActionButton = ({
    isMyRecipe,
    isDraft,
    isMyBookmarks,
    id,
    categoriesIds,
    dataTestButton,
    titleRecipe,
}: RecipeActionButtonProps) => {
    const navigate = useNavigate();

    const { currentSubcategory, currentCategory } = useBuildLinkRecipe(categoriesIds);
    const linkEditRecipe = `/edit-recipe/${currentCategory?.category}/${currentSubcategory?.category}/${id}`;
    const linkDraftRecipe = `/edit-draft/${id}`;
    const link = isDraft ? linkDraftRecipe : linkEditRecipe;

    const handleEditRecipe = () => {
        if (isDraft) {
            navigate(link, {
                state: {
                    from: isDraft,
                },
            });
        } else {
            navigate(link);
        }
    };
    if (isMyRecipe) {
        return (
            <Button
                className={styles.button}
                mt='10px'
                mb='9px'
                size='sm'
                maxW='132px'
                alignSelf='flex-end'
                variant='outline'
                bg={isDraft ? 'alpha.900' : 'white'}
                color={isDraft ? 'white' : 'alpha.800'}
                borderColor='alpha.600'
                onClick={handleEditRecipe}
            >
                Редактировать
            </Button>
        );
    }

    if (isMyBookmarks) {
        return <RemoveBookmarkButton id={id} />;
    }

    return (
        <ButtonGroup className={styles.card_footer}>
            <FavoriteButton id={id} />
            <SimpleButton _id={id} dataTestButton={dataTestButton} titleRecipe={titleRecipe} />
        </ButtonGroup>
    );
};
