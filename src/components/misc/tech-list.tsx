'use client';

import { type MouseEvent, useEffect, useRef, useState } from 'react';

import { allTeches } from 'contentlayer/generated';
import gsap from 'gsap';
import { useMDXComponent } from 'next-contentlayer/hooks';

const TechList = () => {
    const [hoveredTechIndex, setHoveredTechIndex] = useState<number | null>(null);
    const techCardRef = useRef<HTMLDivElement>(null);
    const techContentRef = useRef<HTMLDivElement>(null);

    const tech = allTeches.sort((a, b) => a.position - b.position);

    useEffect(() => {
        if (
            hoveredTechIndex === null ||
            !techCardRef.current ||
            !techContentRef.current ||
            !(techContentRef.current.children[hoveredTechIndex] as HTMLElement | undefined)
        )
            return;

        // Height of the tech item in the card
        const height = techContentRef.current.children[hoveredTechIndex].clientHeight;

        gsap.to(techCardRef.current, {
            duration: 0.4,
            height: height,
            ease: 'power4.out',
        });

        const hoveredTechItemTop = (
            techContentRef.current.children[hoveredTechIndex] as HTMLElement
        ).offsetTop;

        gsap.to(techContentRef.current, {
            duration: 0.4,
            y: -hoveredTechItemTop,
            ease: 'power4.out',
        });
    }, [hoveredTechIndex]);

    const onMouseEnter = () => {
        gsap.to(techCardRef.current, {
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

        if (!techCardRef.current) return;
        gsap.to(techCardRef.current, {
            duration: 0.4,
            x: x / 5,
            y: e.clientY - top - techCardRef.current.clientHeight / 2,
            rotation,
            ease: 'power4.out',
        });
    };

    const onMouseLeave = () => {
        gsap.to(techCardRef.current, {
            duration: 0.4,
            scale: 0,
            ease: 'power4.out',
        });
    };

    const onCardMouseEnter = (index: number) => {
        setHoveredTechIndex(index);
    };

    return (
        <div
            className="relative flex flex-col gap-4"
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}>
            {tech.map((item, index) => {
                return (
                    <div
                        key={item.name}
                        className="border rounded-2xl border-charade-700 p-8"
                        onMouseEnter={() => onCardMouseEnter(index)}>
                        <span className="text-xl">{item.name}</span>
                    </div>
                );
            })}
            <div
                className="absolute right-16 top-0 w-[32rem] h-52 border border-charade-700 bg-charade-900 rounded-2xl overflow-hidden scale-0 pointer-events-none"
                ref={techCardRef}>
                <div className="flex flex-col gap-4" ref={techContentRef}>
                    {tech.map(item => {
                        const MDXContent = useMDXComponent(item.body.code);

                        return (
                            <div className="flex flex-col gap-4 p-8" key={item.name}>
                                <span className="text-xl">{item.name}</span>
                                <div className="text-charade-400">
                                    <MDXContent />
                                </div>
                                <div className="flex justify-between gap-4 mt-4">
                                    <span className="text-charade-400">Experience</span>
                                    {item.experience}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TechList;
