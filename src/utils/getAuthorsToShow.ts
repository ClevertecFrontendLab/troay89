export function getAuthorsToShow<T>(
    showAll: boolean,
    collapsedCount: number,
    authors?: T[],
): T[] | undefined {
    if (showAll) {
        if (authors !== undefined) {
            return authors;
        } else {
            return undefined;
        }
    } else {
        if (authors && Array.isArray(authors)) {
            return authors.slice(0, collapsedCount);
        } else {
            return undefined;
        }
    }
}
