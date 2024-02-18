interface ErrorAnswer {
    data: {
        error: string;
        message: string;
        statusCode: number;
    };
    status: number;
}
