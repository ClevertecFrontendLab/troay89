type ColSpan = {
    base: number;
    bp76: number;
};

export function getColSpan(index: number, total: number): ColSpan {
    const remainder = total % 3 || 3;
    const isLastRow = index >= total - remainder;

    let colSpan = { base: 1, bp76: 4 };
    if (isLastRow && total % 3 !== 0) {
        if (total % 3 === 2) {
            colSpan = { base: 1, bp76: 6 };
        }
        if (total % 3 === 1) {
            colSpan = { base: 1, bp76: 6 };
        }
    }

    return colSpan;
}
