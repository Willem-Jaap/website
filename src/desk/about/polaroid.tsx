import type { CSSProperties } from 'react';

import Image from 'next/image';

import cn from '~/utils/cn';

interface Props {
    src: string;
    alt: string;
    /** Intrinsic size of the image file */
    width: number;
    height: number;
    /** Width of the photo on the mat, in world units */
    photoWidth: number;
    /** Handwritten on the bottom border; left blank when omitted */
    caption?: string;
    /** Load straight away, for photos in the first view */
    priority?: boolean;
    className?: string;
    style?: CSSProperties;
}

/** An instant photo: thick white frame, a wide bottom border with a handwritten caption */
const Polaroid = ({
    src,
    alt,
    width,
    height,
    photoWidth,
    caption,
    priority,
    className,
    style,
}: Props) => (
    <figure
        className={cn('paper shadow-object absolute rounded-[3px] p-[40px] pb-0', className)}
        style={style}>
        <div
            className="relative overflow-hidden bg-[#111]"
            style={{ width: photoWidth, height: (photoWidth * height) / width }}>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                unoptimized
                priority={priority}
                draggable={false}
                className="size-full object-cover saturate-[0.9] contrast-[1.03]"
            />
            {/* Glossy print: a faint sheen and a darker inner edge */}
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.12),transparent_35%,transparent_70%,rgb(255_255_255/0.05))] shadow-[inset_0_0_12px_rgb(0_0_0/0.35)]" />
        </div>
        {caption ? (
            <figcaption className="font-hand flex h-[140px] items-center justify-center text-[56px] leading-none text-[#28324a]">
                {caption}
            </figcaption>
        ) : (
            <div className="h-[140px]" />
        )}
    </figure>
);

export default Polaroid;
