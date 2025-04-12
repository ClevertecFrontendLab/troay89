import { useLayoutEffect, useRef, useState } from 'react';

type FormattingTextProps = {
    text: string;
    maxLines?: number;
    width?: string;
};

function FormattingText({ text, maxLines = 3, width = '300px' }: FormattingTextProps) {
    const measureRef = useRef<HTMLDivElement | null>(null);
    const [displayText, setDisplayText] = useState<string>(text);

    useLayoutEffect(() => {
        const container = measureRef.current;
        if (!container) return;
        container.style.width = width;
        container.style.whiteSpace = 'normal';
        container.style.wordBreak = 'normal';
        container.style.padding = '0';
        container.style.border = 'none';

        const executeTruncation = () => {
            requestAnimationFrame(() => {
                const computedStyle = getComputedStyle(container);
                const lineHeight = parseFloat(computedStyle.lineHeight);
                const maxHeight = lineHeight * maxLines;

                container.innerText = text;
                if (container.scrollHeight <= maxHeight) {
                    setDisplayText(text);
                    return;
                }

                const fits = (length: number): boolean => {
                    container.innerText = text.slice(0, length) + '...';
                    return container.scrollHeight <= maxHeight;
                };

                let start = 0;
                let end = text.length;
                let best = 0;
                while (start <= end) {
                    const mid = Math.floor((start + end) / 2);
                    if (fits(mid)) {
                        best = mid;
                        start = mid + 1;
                    } else {
                        end = mid - 1;
                    }
                }

                setDisplayText(text.slice(0, best) + '...');
            });
        };
        console.log('I am here');
        if (document.fonts) {
            document.fonts.ready.then(() => {
                executeTruncation();
            });
        } else {
            executeTruncation();
        }
    }, [text, maxLines, width]);

    return (
        <>
            <div
                ref={measureRef}
                style={{
                    position: 'absolute',
                    visibility: 'hidden',
                    zIndex: -1,
                    whiteSpace: 'normal',
                    overflowWrap: 'break-word',
                    width,
                }}
            />
            <div style={{ width, overflow: 'hidden', wordBreak: 'normal' }}>{displayText}</div>
        </>
    );
}

export default FormattingText;
