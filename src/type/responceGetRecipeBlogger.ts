import { Note } from './author';
import { RecipeType } from './RecipeType';

export type RecipeBlogger = {
    totalBookmarks: number;
    totalSubscribers: number;
    userId: string;
    notes: Note[];
    recipes: RecipeType[];
    myBookmarks?: RecipeType[];
};
