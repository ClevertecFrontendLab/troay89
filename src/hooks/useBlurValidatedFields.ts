import { useState } from 'react';
import type { FieldValues, Path, UseFormTrigger } from 'react-hook-form';

export function useBlurValidatedFields<T extends FieldValues>(trigger: UseFormTrigger<T>) {
    const [validatedFields, setValidatedFields] = useState<Partial<Record<Path<T>, boolean>>>({});

    const handleBlur = async (
        field: Path<T>,
        event: React.FocusEvent<HTMLInputElement>,
        defaultOnBlur: (event: React.FocusEvent<HTMLInputElement>) => void,
    ) => {
        if (event.target.type !== 'password') {
            event.target.value = event.target.value.trim();
        }

        defaultOnBlur(event);
        const isValid = await trigger(field);
        setValidatedFields((prev) => ({ ...prev, [field]: isValid }));
    };

    return { validatedFields, handleBlur };
}
