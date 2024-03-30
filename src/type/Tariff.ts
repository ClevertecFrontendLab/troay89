export type TariffList = {
    _id: 'string';
    name: 'string';
    periods: [
        {
            text: 'string';
            cost: number;
            days: number;
        },
    ];
};

export type buyTariff = {
    tariffId: string;
    days: number;
};
