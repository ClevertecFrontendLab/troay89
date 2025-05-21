export const isNumberMoreZero = (value: unknown): value is number =>
    typeof value === 'number' && value > 0;
