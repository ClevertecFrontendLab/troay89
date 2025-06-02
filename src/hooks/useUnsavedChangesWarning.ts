import { useCallback, useEffect, useState } from 'react';
import { useBlocker } from 'react-router';

export function useUnsavedChangesWarning(shouldBlock: boolean) {
    const blocker = useBlocker(shouldBlock);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (blocker.state === 'blocked') {
            setShowModal(true);
        }
    }, [blocker.state]);

    const confirmNavigation = useCallback(() => {
        setShowModal(false);
        blocker.proceed?.();
    }, [blocker]);

    const cancelNavigation = useCallback(() => {
        setShowModal(false);
        blocker.reset?.();
    }, [blocker]);

    return { showModal, confirmNavigation, cancelNavigation };
}
