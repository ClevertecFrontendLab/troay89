import { FocusEvent } from 'react';
import { FieldValues, Path, PathValue } from 'react-hook-form';
import { UseFormSetValue } from 'react-hook-form';

export function handleBlurTrim<T extends FieldValues, K extends Path<T>>(
    e: FocusEvent<HTMLInputElement>,
    field: K,
    setValue: UseFormSetValue<T>,
    originalOnBlur?: (e: FocusEvent<HTMLInputElement>) => void,
): void {
    if (originalOnBlur) {
        originalOnBlur(e);
    }
    const trimmed = e.target.value.trim();
    setValue(field, trimmed as PathValue<T, K>);
}
