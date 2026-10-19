'use client';

import Link from 'next/link';

import { useIsRegionFocused } from '~/desk/region';
import { posts } from '~/content/writing';
import Sheet from '~/desk/writing/sheet';

interface Pose {
    x: number;
    y: number;
    rotate: number;
}

/** Where each sheet lies, newest first: dropped in a messy pile... */
const PILED: Pose[] = [
    { x: 230, y: 300, rotate: -2 },
    { x: 205, y: 318, rotate: 3.5 },
    { x: 258, y: 286, rotate: -5 },
];

/** ...and pulled apart so every title shows */
const FANNED: Pose[] = [
    { x: 290, y: 448, rotate: -1.5 },
    { x: 180, y: 238, rotate: 1 },
    { x: 70, y: 30, rotate: -2.5 },
];

const FALLBACK: Pose = { x: 0, y: 0, rotate: 0 };

const Stack = () => {
    // Fan out once the corner fills most of the screen, whatever its size
    const isFocused = useIsRegionFocused('writing');
    const poses = isFocused ? FANNED : PILED;

    return (
        <ol aria-label="Articles" className="absolute inset-0">
            {/* Oldest first, so the newest ends up on top */}
            {posts
                .map((post, index) => ({ post, pose: poses[index] ?? FALLBACK }))
                .reverse()
                .map(({ post, pose }) => (
                    <li
                        key={post.slug}
                        className="absolute left-0 top-0 transition-transform duration-500 ease-out motion-reduce:transition-none"
                        style={{
                            transform: `translate(${pose.x}px, ${pose.y}px) rotate(${pose.rotate}deg)`,
                        }}>
                        <Link
                            href={`/writing/${post.slug}`}
                            draggable={false}
                            className="block transition-transform duration-200 ease-out hover:-translate-y-2 focus-visible:-translate-y-2">
                            <Sheet post={post} />
                        </Link>
                    </li>
                ))}
        </ol>
    );
};

export default Stack;
