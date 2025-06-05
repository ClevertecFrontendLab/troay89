import { Note } from './author';
import { RecipeType } from './RecipeType';

export type RecipeBloger = {
    totalBookmarks: number;
    totalSubscribers: number;
    userId: string;
    notes: Note[];
    recipes: RecipeType[];
};
