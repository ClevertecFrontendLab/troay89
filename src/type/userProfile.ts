import { Note } from './author';
import { RecipeType } from './RecipeType';

type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;

export type DraftRecipe = PartialExcept<RecipeType, '_id' | 'title'>;

export type userProfile = {
    _id: string;
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    likes: number;
    bookmarks: number;
    recipesIds: string[];
    drafts: DraftRecipe[];
    notes: Note[];
    subscriptions: string[];
    subscribers: string[];
};
