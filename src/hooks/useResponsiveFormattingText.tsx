import { useEffect, useMemo, useRef, useState } from 'react';

type UseResponsiveFormattingTextOptions = {
    computeFormattingTextWidth?: (width: number) => number;
    computeMaxLines?: (width: number) => number;
};

export function useResponsiveFormattingText(options?: UseResponsiveFormattingTextOptions) {
    const memoizedComputeFormattingTextWidth = useMemo(
        () =>
            options?.computeFormattingTextWidth ||
            ((width: number) => {
                if (width < 500) return 153;
                else if (width < 951) return 181;
                else if (width < 1900) return 486;
                else return 274;
            }),
        [options?.computeFormattingTextWidth],
    );

    const memoizedComputeMaxLines = useMemo(
        () => options?.computeMaxLines || ((width: number) => (width <= 950 ? 2 : 1)),
        [options?.computeMaxLines],
    );

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [formattingTextWidth, setFormattingTextWidth] = useState<number>(
        memoizedComputeFormattingTextWidth(window.innerWidth),
    );
    const [maxLines, setMaxLines] = useState<number>(memoizedComputeMaxLines(window.innerWidth));

    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        const handleResize = () => {
            if (timerRef.current === null) {
                timerRef.current = window.setTimeout(() => {
                    setWindowWidth(window.innerWidth);
                    timerRef.current = null;
                }, 1000);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const newFormattingTextWidth = memoizedComputeFormattingTextWidth(windowWidth);
        setFormattingTextWidth(newFormattingTextWidth);
    }, [windowWidth, memoizedComputeFormattingTextWidth]);

    useEffect(() => {
        const newMaxLines = memoizedComputeMaxLines(windowWidth);
        setMaxLines(newMaxLines);
    }, [windowWidth, memoizedComputeMaxLines]);

    return { windowWidth, formattingTextWidth, maxLines };
}
