'use client';

import { useEffect, useRef } from 'react';

interface Props {
    text: string;
}

// hex characters
const characters = '0123456789abcdefABCDEF';

const getRandomCharacters = (amount: number = 100) => {
    let result = '';

    for (let i = 0; i < amount; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
};

const PaddedWithRandomized = ({ text }: Props) => {
    const firstLineRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const secondLineRef = useRef<HTMLDivElement>(null);
    const thirdLineRef = useRef<HTMLDivElement>(null);

    const randomizeLines = () => {
        if (firstLineRef.current && secondLineRef.current && thirdLineRef.current) {
            firstLineRef.current.innerText = getRandomCharacters();
            secondLineRef.current.innerText = getRandomCharacters(100 - text.length);
            thirdLineRef.current.innerText = getRandomCharacters();
        }
    };

    useEffect(() => {
        const characters = text.split('');
        let index = 0;

        const interval = setInterval(() => {
            if (!textRef.current) return;

            randomizeLines();
            const content = textRef.current.innerText.split('');
            content[index] = characters[index].toUpperCase();
            textRef.current.innerText = content.join('');

            index++;

            // Stop the interval when all letters have been added
            if (index >= characters.length) clearInterval(interval);
        }, 75);
    }, [text]);

    return (
        <div className="text-charade-700 text-3xl">
            <div className="break-all overflow-hidden h-[1.5em]" ref={firstLineRef}>
                {getRandomCharacters()}
            </div>
            <div className="break-all overflow-hidden h-[1.5em]">
                <span className="text-charade-100 break-all h-[1.5em]" ref={textRef}>
                    {getRandomCharacters(text.length)}
                </span>
                <span ref={secondLineRef}>{getRandomCharacters(100 - text.length)}</span>
            </div>
            <div className="break-all overflow-hidden h-[1.5em]" ref={thirdLineRef}>
                {getRandomCharacters()}
            </div>
        </div>
    );
};

export default PaddedWithRandomized;
