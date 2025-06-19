export type AuthorData = {
    favorites: Author[];
    others: Author[];
};

export type Author = {
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    subscribersCount: number;
    bookmarksCount: number;
    isFavorite: boolean;
    notes: Note[];
    newRecipesCount: number;
};

export type Note = {
    date?: string;
    text?: string;
    _id?: string;
};
