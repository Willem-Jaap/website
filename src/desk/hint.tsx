'use client';

import { useEffect, useState } from 'react';

import cn from '~/utils/cn';

const SEEN_KEY = 'desk-hint-seen';
const SHOW_FOR = 8000;

/** How to get around, shown above the dock on a first visit until you start moving */
const Hint = () => {
    const [text, setText] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        try {
            if (localStorage.getItem(SEEN_KEY)) return;
            localStorage.setItem(SEEN_KEY, '1');
        } catch {
            // Storage can be blocked; show the hint every visit then
        }
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        setText(
            isTouch
                ? 'Pinch to zoom · tap things to look closer'
                : 'Scroll to zoom · drag to look around',
        );
        setIsVisible(true);

        const hide = () => setIsVisible(false);
        const timeout = setTimeout(hide, SHOW_FOR);
        const events = ['pointerdown', 'wheel', 'keydown'] as const;
        // Give the page a moment, so the click that brought you here doesn't count
        const listen = setTimeout(
            () => events.forEach(type => window.addEventListener(type, hide, { once: true })),
            500,
        );
        return () => {
            clearTimeout(timeout);
            clearTimeout(listen);
            events.forEach(type => window.removeEventListener(type, hide));
        };
    }, []);

    if (!text) return null;

    return (
        <p
            role="status"
            className={cn(
                'rounded-full bg-black/60 px-4 py-2 text-center text-[13px] font-medium tracking-[0.02em] text-white/85 shadow-xl backdrop-blur-md transition-[opacity,translate] duration-500',
                isVisible ? 'opacity-100' : 'translate-y-2 opacity-0',
            )}>
            {text}
        </p>
    );
};

export default Hint;
