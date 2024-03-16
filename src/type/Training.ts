export type TrainingList = {
    name: string;
    key: string;
};

export type PersonalTraining = {
    _id?: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId?: string;
    parameters: {
        repeat: false;
        period: number;
        jointTraining: false;
        participants: [];
    };
    exercises: {
        _id?: string;
        name: string;
        replays: number;
        weight: number;
        approaches: number;
        isImplementation: boolean;
    }[];
};

export type DataTraining = {
    name: string;
    replays: number | undefined;
    weight: number | undefined;
    approaches: number | undefined;
};

export type KindDataTraining = {
    kindTraining: string;
    date: string;
    data: DataTraining[];
};
