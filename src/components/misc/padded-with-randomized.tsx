'use client';

import { useContext, useEffect, useRef } from 'react';

import SettingsContext from '~contexts/settings-context';
import getRandomCharacters from '~utils/get-random-characters';

interface Props {
    text: string;
}

const PaddedWithRandomized = ({ text }: Props) => {
    const firstLineRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const secondLineRef = useRef<HTMLDivElement>(null);
    const thirdLineRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    const settings = useContext(SettingsContext);

    const randomizeLines = () => {
        if (firstLineRef.current && secondLineRef.current && thirdLineRef.current) {
            firstLineRef.current.innerText = getRandomCharacters();
            secondLineRef.current.innerText = getRandomCharacters(100 - text.length);
            thirdLineRef.current.innerText = getRandomCharacters();
        }
    };

    const onScroll = () => {
        let previousScroll = 0;

        if (window.scrollY != previousScroll) {
            randomizeLines();
        }

        previousScroll = Math.round(window.scrollY / 32);
    };

    useEffect(() => {
        const characters = text.split('');
        let index = 0;

        if (
            hasAnimated.current ||
            !textRef.current ||
            !firstLineRef.current ||
            !secondLineRef.current ||
            !thirdLineRef.current
        )
            return;

        hasAnimated.current = true;
        firstLineRef.current.innerText = getRandomCharacters();
        secondLineRef.current.innerText = getRandomCharacters(100 - text.length);
        thirdLineRef.current.innerText = getRandomCharacters();

        const interval = setInterval(() => {
            if (!textRef.current || !characters[index]) return;

            randomizeLines();
            const content = textRef.current.innerText.split('');
            content[index] = (characters[index] as string).toUpperCase();
            textRef.current.innerText = content.join('');

            index++;

            // Stop the interval when all letters have been added
            if (index >= characters.length) clearInterval(interval);
        }, 75);
    }, []);

    useEffect(() => {
        settings.get('textRandomization')
            ? window.addEventListener('scroll', onScroll)
            : window.removeEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [settings.get('textRandomization')]);

    return (
        <div className="text-charade-700 text-4xl">
            <div className="break-all overflow-hidden h-[1.5em]" ref={firstLineRef} />
            <div className="break-all overflow-hidden h-[1.5em]">
                <span className="text-charade-100 break-all h-[1.5em]" ref={textRef} />
                <span ref={secondLineRef} />
            </div>
            <div className="break-all overflow-hidden h-[1.5em]" ref={thirdLineRef} />
        </div>
    );
};

export default PaddedWithRandomized;
