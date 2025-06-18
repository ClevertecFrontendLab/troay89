import { Box, Button, Flex, Heading, Icon, Image, Text } from '@chakra-ui/react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { fallback } from '~/assets/images/header';
import { ErrorModal } from '~/components/alert/alert-failed/AlertFailed';
import BookMark from '~/components/icons/BookMark';
import Clock from '~/components/icons/Clock';
import EmojiHeart from '~/components/icons/EmojiHeart';
import { GarbageBlak } from '~/components/icons/GarbageBlak';
import { Pencil } from '~/components/icons/Pencil';
import { LabelTypeFood } from '~/components/label-type-food/LabelTypeFood';
import { StatsForCard } from '~/components/stats-card/StatsForCard';
import { DATA_TEST_ID } from '~/constants/dataTestId';
import { STORAGE_KEY } from '~/constants/storageKey';
import { URLS } from '~/constants/url';
import { useHandleError } from '~/hooks/useErrorHandler';
import { getArrayCategorySelector } from '~/store/selectors/arrayCategorySelector';
import {
    useBookmarkMutation,
    useDeleteRecipeMutation,
    useLikeRecipeMutation,
} from '~/store/slice/api/api-slice';
import { Category } from '~/type/Category';
import { RecipeType } from '~/type/RecipeType';
import { isFetchBaseQueryError } from '~/utils/isFetchBaseQueryError';

import styles from './CardAboutRecipe.module.css';

type CardAboutRecipe = {
    recipeData: RecipeType;
    deleteRecipe: ReturnType<typeof useDeleteRecipeMutation>[0];
    IsErrorDeleteRecipe: boolean;
    putLikeUnlike: ReturnType<typeof useLikeRecipeMutation>[0];
    saveRemoveBookmark: ReturnType<typeof useBookmarkMutation>[0];
    isErrorLikeUnlike: boolean;
    isErrorBookmark: boolean;
};

export const CardAboutRecipe = ({
    recipeData,
    deleteRecipe,
    IsErrorDeleteRecipe,
    putLikeUnlike,
    saveRemoveBookmark,
    isErrorLikeUnlike,
    isErrorBookmark,
}: CardAboutRecipe) => {
    const { title, image, bookmarks, likes, description, time, categoriesIds, authorId } =
        recipeData;
    const navigate = useNavigate();
    const { category, subcategories, id } = useParams();
    const categories = useSelector(getArrayCategorySelector);
    const [categoriesCard, setCategoriesCard] = useState<Category[]>([]);
    const idUser = localStorage.getItem(STORAGE_KEY.DECODED_PAYLOAD);
    const isShowEditButton = authorId === idUser;
    const [titleError, setTitleError] = useState('');
    const [notification, setNotification] = useState('');

    const handleErrorDelete = useHandleError(setTitleError, setNotification, 'delete-recipe');
    const handleErrorLikeBookmark = useHandleError(setTitleError, setNotification, 'like-bookmark');

    const hasError = IsErrorDeleteRecipe || isErrorLikeUnlike || isErrorBookmark;
    const [isOpenError, setIsOpenError] = useState(hasError);

    useEffect(() => {
        const subcategoryFilter = categories.filter((category) =>
            categoriesIds.includes(category._id),
        );
        const filteredCategories = categories.filter((category) =>
            subcategoryFilter.some((item) => item.rootCategoryId === category._id),
        );
        setCategoriesCard(filteredCategories);
    }, [categories, categoriesIds]);

    const handleDeleteRecipe = async () => {
        try {
            if (id) {
                await deleteRecipe({ id: id }).unwrap();
                navigate('/', { state: { showAlertDelete: true } });
            }
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                setIsOpenError(true);
                handleErrorDelete(error);
            }
        }
    };

    const handleLikeRecipe = async () => {
        try {
            if (!id) return;
            await putLikeUnlike({ id: id }).unwrap();
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                setIsOpenError(true);
                handleErrorLikeBookmark(error);
            }
        }
    };

    const handleBookmarkRecipe = async () => {
        try {
            if (!id) return;
            await saveRemoveBookmark({ recipeId: id, userId: recipeData.authorId }).unwrap();
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                setIsOpenError(true);
                handleErrorLikeBookmark(error);
            }
        }
    };

    const linkEditRecipe: string = `/edit-recipe/${category}/${subcategories}/${id}`;

    const handleEditRecipe = () => {
        navigate(linkEditRecipe);
    };

    return (
        <Flex className={styles.container} mt={{ base: 4, bp95: 14 }} mb={{ base: 6, bp95: 10 }}>
            <Image
                className={styles.image}
                src={`${URLS.IMAGE_URL}${image}`}
                alt={title}
                background='alpha.200'
                fallbackSrc={fallback}
                objectFit='none'
                objectPosition='center'
            />
            <Flex
                direction='column'
                pl={{ base: 0, bp76: 4, bp95: 6 }}
                pt={{ base: 4, bp76: 0 }}
                width='100%'
            >
                <Flex gap={5} justify='space-between' alignItems='flex-start'>
                    <Flex rowGap='8px' columnGap={{ base: '9px', bp160: '17px' }} flexWrap='wrap'>
                        {categoriesCard.map((item) => (
                            <LabelTypeFood
                                title={item.title}
                                icon={item.icon}
                                key={item._id}
                                yellow
                            />
                        ))}
                    </Flex>
                    <Box py={{ base: '4px', bp160: '6px' }} pr={{ base: 0, bp160: '8px' }}>
                        <StatsForCard
                            favorites={bookmarks}
                            like={likes}
                            isForAboutRecipe
                            size='14px'
                            gapContainer='33px'
                            gapIcon='8px'
                        />
                    </Box>
                </Flex>
                <Heading className={styles.title} as='h1'>
                    {title}
                </Heading>
                <Text className={styles.description}>{description}</Text>
                <Flex
                    className={styles.bottom}
                    mt='auto'
                    alignItems={{ base: 'flex-start', bp76: 'flex-end' }}
                    justify='space-between'
                    direction={{ base: 'column', bp76: 'row' }}
                    gap={{ base: 3, bp76: 0 }}
                >
                    <Flex
                        className={styles.time_label}
                        alignItems='center'
                        px='8px'
                        py='2px'
                        gap='8px'
                    >
                        <Icon as={Clock} />
                        <Text className={styles.clock_text}>{time}</Text>
                    </Flex>

                    <Flex className={styles.group_button} gap={{ base: '12px', bp160: '16px' }}>
                        {isShowEditButton ? (
                            <>
                                <Flex
                                    boxSize={{ base: 6, bp95: 8, bp160: 12 }}
                                    as='button'
                                    justify='center'
                                    align='center'
                                    onClick={handleDeleteRecipe}
                                    data-test-id={DATA_TEST_ID.RECIPE_DELETE_BUTTON}
                                >
                                    <Icon as={GarbageBlak} />
                                </Flex>
                                <Button
                                    className={classNames(styles.button, styles.extra_styles)}
                                    px='6px'
                                    variant='outline'
                                    size={{ base: 'xs', bp95: 'sm', bp160: 'lg' }}
                                    bg='white'
                                    leftIcon={
                                        <Pencil
                                            boxSize={{ base: '12px', bp95: '14px', bp160: '16px' }}
                                        />
                                    }
                                    onClick={handleEditRecipe}
                                >
                                    Редактировать рецепт
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    leftIcon={
                                        <EmojiHeart
                                            boxSize={{ base: '12px', bp95: '14px', bp160: '16px' }}
                                        />
                                    }
                                    iconSpacing={{ base: '7px', bp76: '8px' }}
                                    className={styles.button}
                                    size={{ base: 'xs', bp95: 'sm', bp160: 'lg' }}
                                    px='23px'
                                    variant='outline'
                                    onClick={handleLikeRecipe}
                                >
                                    Оценить рецепт
                                </Button>
                                <Button
                                    leftIcon={
                                        <BookMark
                                            boxSize={{ base: '12px', bp95: '14px', bp160: '16px' }}
                                        />
                                    }
                                    iconSpacing={{ base: '7px', bp76: '8px' }}
                                    className={styles.button}
                                    size={{ base: 'xs', bp95: 'sm', bp160: 'lg' }}
                                    px='23px'
                                    onClick={handleBookmarkRecipe}
                                >
                                    Сохранить в закладки
                                </Button>
                            </>
                        )}
                    </Flex>
                </Flex>
            </Flex>
            {isOpenError && (
                <ErrorModal
                    onClose={() => setIsOpenError(false)}
                    title={titleError}
                    notification={notification}
                />
            )}
        </Flex>
    );
};
