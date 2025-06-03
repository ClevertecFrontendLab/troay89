export type BloggerInfo = {
    _id: string;
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    recipesIds: string[];
    subscriptions: string[];
    subscribers: string[];
};

export type BloggerData = {
    bloggerInfo: BloggerInfo;
    totalSubscribers: number;
    totalBookmarks: number;
    isFavorite: boolean;
};
