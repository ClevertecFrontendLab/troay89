export type TrainingList = {
    name: string;
    key: string;
};

export type PersonalTraining = [
    {
        _id: 'string';
        name: 'string';
        date: '2024-03-08T12:54:36.647Z';
        isImplementation: false;
        userId: 'string';
        parameters: {
            repeat: false;
            period: 7;
            jointTraining: false;
            participants: ['string'];
        };
        exercises: [
            {
                _id: 'string';
                name: 'string';
                replays: 0;
                weight: 0;
                approaches: 0;
                isImplementation: false;
            },
        ];
    },
];
