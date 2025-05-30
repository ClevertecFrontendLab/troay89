import { useCallback, useEffect, useState } from 'react';
import { useBlocker } from 'react-router';

export function useUnsavedChangesWarning(shouldBlock: boolean) {
    // Вызываем useBlocker только с булевым значением, которое указывает, нужно ли блокировать навигацию
    const blocker = useBlocker(shouldBlock);
    const [showModal, setShowModal] = useState(false);

    // При блокировке навигации (state === 'blocked') открываем модальное окно
    useEffect(() => {
        if (blocker.state === 'blocked') {
            setShowModal(true);
        }
    }, [blocker.state]);

    // Для подтверждения навигации вместо tx.retry() вызываем blocker.proceed()
    const confirmNavigation = useCallback(() => {
        setShowModal(false);
        blocker.proceed?.();
    }, [blocker]);

    // Для отмены заблокированной навигации вызываем blocker.reset()
    const cancelNavigation = useCallback(() => {
        setShowModal(false);
        blocker.reset?.();
    }, [blocker]);

    return { showModal, confirmNavigation, cancelNavigation };
}
