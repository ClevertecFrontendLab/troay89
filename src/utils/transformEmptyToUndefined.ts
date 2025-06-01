export const transformEmptyToUndefined = (obj: unknown): unknown => {
    if (typeof obj === 'string') {
        return obj.trim() === '' ? null : obj;
    } else if ((typeof obj === 'number' && isNaN(obj)) || obj === 0) {
        return null;
    }
    if (Array.isArray(obj)) {
        return obj.map((item) => transformEmptyToUndefined(item));
    }
    if (obj !== null && typeof obj === 'object') {
        return Object.entries(obj).reduce(
            (acc, [key, value]) => {
                acc[key] = transformEmptyToUndefined(value);
                return acc;
            },
            {} as Record<string, unknown>,
        );
    }
    return obj;
};
