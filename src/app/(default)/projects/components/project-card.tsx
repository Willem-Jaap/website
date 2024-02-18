'use client';

import { type MouseEvent, useRef } from 'react';

import { type Project } from 'contentlayer/generated';
import gsap from 'gsap';
import Link from 'next/link';

interface Props {
    project: Project;
}

const ProjectCard = ({ project }: Props) => {
    const cardAccentRef = useRef<HTMLSpanElement>(null);
    const cardGradientRef = useRef<HTMLSpanElement>(null);

    const onMouseEnter = () => {
        gsap.set(cardAccentRef.current, {
            opacity: 0,
        });

        gsap.set(cardGradientRef.current, {
            opacity: 0,
            y: 0,
        });

        gsap.to(cardAccentRef.current, {
            duration: 0.4,
            opacity: 1,
            ease: 'power4.inOut',
        });

        gsap.to(cardGradientRef.current, {
            duration: 0.4,
            opacity: 0.2,
            y: -8,
            ease: 'power4.inOut',
        });
    };

    const onMouseMove = (event: MouseEvent) => {
        if (!cardAccentRef.current) return;
        const { clientX, target } = event;

        const { left, width } = (target as HTMLDivElement).getBoundingClientRect();
        const positionOnCard = clientX - left - width / 2;

        gsap.to(cardAccentRef.current, {
            x: positionOnCard / 4,
            duration: 0,
            ease: 'power4.inOut',
        });
    };

    const onMouseLeave = () => {
        gsap.set(cardAccentRef.current, {
            opacity: 1,
        });

        gsap.set(cardGradientRef.current, {
            opacity: 0.2,
            y: -8,
        });

        gsap.to(cardAccentRef.current, {
            duration: 0.2,
            opacity: 0,
            ease: 'power4.inOut',
        });

        gsap.to(cardGradientRef.current, {
            duration: 0.2,
            opacity: 0,
            y: 0,
            ease: 'power4.inOut',
        });
    };

    const onMouseDown = () => {
        gsap.to(cardGradientRef.current, {
            duration: 0.2,
            scale: 1.1,
            y: 8,
            ease: 'power4.inOut',
        });
    };

    const onMouseUp = () => {
        gsap.to(cardGradientRef.current, {
            duration: 0.2,
            scale: 1,
            y: 0,
            ease: 'power4.inOut',
        });
    };

    const eventListeners = {
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onMouseDown,
        onMouseUp,
    };

    return (
        <Link
            href={project.url}
            {...eventListeners}
            className="relative w-full min-h-[15rem] p-8 rounded-2xl border border-charade-700 flex flex-col justify-between gap-4 overflow-hidden">
            <div className="flex flex-col justify-between gap-4 z-10">
                <h3 className="text-lg">{project.name}</h3>
                <p className="text-charade-400">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 z-10">
                {project.tags?.map(tag => (
                    <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full text-charade-300 bg-charade-800 border border-charade-600 pointer-events-none">
                        {tag}
                    </span>
                ))}
            </div>
            <span
                className="absolute block inset-0 -translate-y-1/2 bg-[radial-gradient(circle_at_center_top,#2d2c35_20%,#111014_80%)] opacity-0"
                ref={cardGradientRef}
            />
            <span
                className="w-12 h-[1px] absolute left-1/2 top-0 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,#545062,transparent)] opacity-0"
                ref={cardAccentRef}
            />
        </Link>
    );
};

export default ProjectCard;
