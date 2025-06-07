import { Note } from './author';

export type BloggerInfo = {
    _id: string;
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    notes?: Note[];
    recipesIds: string[];
    subscriptions: string[];
    subscribers: string[];
    notes: Note[];
};

export type BloggerData = {
    bloggerInfo: BloggerInfo;
    totalSubscribers: number;
    totalBookmarks: number;
    isFavorite: boolean;
};
