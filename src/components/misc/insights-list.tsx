'use client';

import { type MouseEvent, useEffect, useRef, useState } from 'react';

import { allInsights } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

import search from '~app/(default)/insights/utils/search';

interface Props {
    query?: string;
    exclude?: string; // slug of the insight to exclude
    showResultAmount?: boolean;
}

const InsightsList = ({ query, exclude, showResultAmount = false }: Props) => {
    const [hoveredInsightIndex, setHoveredInsightIndex] = useState<number | null>(null);
    const insightsHoverCardRef = useRef<HTMLDivElement>(null);
    const insightItemsRef = useRef<HTMLDivElement>(null);

    let insights = allInsights;

    if (query) {
        insights = search(query, allInsights);
    }

    if (exclude) {
        insights = insights.filter(
            insight => insight._raw.sourceFileName.replace('.mdx', '') !== exclude,
        );
    }

    useEffect(() => {
        if (
            hoveredInsightIndex === null ||
            !insightsHoverCardRef.current ||
            !insightItemsRef.current ||
            !insightItemsRef.current.children[hoveredInsightIndex]
        ) {
            return;
        }
        // Height of the tech item in the card
        const height = insightItemsRef.current.children[hoveredInsightIndex]?.clientHeight;

        gsap.to(insightsHoverCardRef.current, {
            duration: 0.4,
            height: height,
            ease: 'power4.out',
        });

        const hoveredInsightItemTop = (
            insightItemsRef.current.children[hoveredInsightIndex] as HTMLElement
        ).offsetTop;

        gsap.to(insightItemsRef.current, {
            duration: 0.4,
            y: -hoveredInsightItemTop,
            ease: 'power4.out',
        });
    }, [hoveredInsightIndex]);

    const onMouseEnter = () => {
        gsap.to(insightsHoverCardRef.current, {
            duration: 0.4,
            scale: 1,
            ease: 'power4.out',
        });
    };

    const onMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;

        // Rotate the card a little (between -5 and 5 degrees) based on the mouse position
        let rotation = y / 20 + (x / width) * 5;
        if (rotation > 5) {
            rotation += (5 - rotation) * 2;
        }

        if (rotation < -5) {
            rotation += (-5 - rotation) * 2;
        }

        if (!insightsHoverCardRef.current) return;
        gsap.to(insightsHoverCardRef.current, {
            duration: 0.4,
            x: x / 5,
            y: e.clientY - top - insightsHoverCardRef.current.clientHeight / 2,
            rotation,
            ease: 'power4.out',
        });
    };

    const onMouseLeave = () => {
        gsap.to(insightsHoverCardRef.current, {
            duration: 0.4,
            scale: 0,
            ease: 'power4.out',
        });
    };

    const onCardMouseEnter = (index: number) => {
        setHoveredInsightIndex(index);
    };

    return (
        <div className="-mt-4">
            {showResultAmount && query && (
                <p className="text-sm pb-4 text-charade-400">
                    {insights.length} result{insights.length === 1 ? '' : 's'} for &quot;{query}
                    &quot;:
                </p>
            )}
            <div
                className="relative border-t border-t-charade-800"
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}>
                {!insights.length && (
                    <div className="flex items-center h-full text-charade-400 my-8">
                        I haven&apos;t written any insights yet.
                    </div>
                )}
                {insights.map((insight, index) => (
                    <Link
                        key={insight.title}
                        href={insight.url}
                        onMouseEnter={() => onCardMouseEnter(index)}
                        className="flex gap-4 justify-between items-center border-b py-4 border-b-charade-800">
                        <h2 className="mb-1 text-lg text-charade-100">{insight.title}</h2>
                        <div className="flex">
                            <time
                                dateTime={insight.publishedAt}
                                className="mb-2 block text-charade-400">
                                {format(parseISO(insight.publishedAt), 'LLLL d, yyyy')}
                            </time>
                        </div>
                    </Link>
                ))}
                <div
                    className="absolute left-1/2 -top-1/4 w-[32rem] h-72 border border-charade-700 bg-charade-900 rounded-2xl overflow-hidden scale-0 pointer-events-none"
                    ref={insightsHoverCardRef}>
                    <div ref={insightItemsRef}>
                        {insights.map(insight => (
                            <Link
                                href={insight.url}
                                key={insight.title}
                                className="relative block w-[32rem] h-72">
                                <Image
                                    src={'/assets/images/insights/' + insight.thumbnail}
                                    alt={insight.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 flex flex-col gap-2 p-4 items-center justify-center text-center bg-charade-900/90">
                                    <h2 className="text-white">{insight.title}</h2>
                                    <p className="text-sm text-charade-300">
                                        {insight.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsightsList;
