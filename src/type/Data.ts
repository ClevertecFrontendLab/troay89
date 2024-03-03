export type ServerResponseAuth = {
    accessToken: string;
};

export type Comments = {
    id: string;
    fullName: string;
    imageSrc: string;
    message: string;
    rating: number;
    createdAt: string;
};

export type SendComment = {
    message: string;
    rating: number;
};
