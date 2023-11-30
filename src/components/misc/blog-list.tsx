'use client';

import { type MouseEvent, useEffect, useRef, useState } from 'react';

import { allBlogs } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

import search from '~app/(default)/blog/utils/search';

interface Props {
    query?: string;
    exclude?: string; // slug of the blog to exclude
    showResultAmount?: boolean;
}

const BlogList = ({ query, exclude, showResultAmount = false }: Props) => {
    const [hoveredBlogIndex, setHoveredBlogIndex] = useState<number | null>(null);
    const blogsHoverCardRef = useRef<HTMLDivElement>(null);
    const blogItemsRef = useRef<HTMLDivElement>(null);

    let blogs = allBlogs;

    if (query) {
        blogs = search(query, allBlogs);
    }

    if (exclude) {
        blogs = blogs.filter(blog => blog._raw.sourceFileName.replace('.mdx', '') !== exclude);
    }

    useEffect(() => {
        if (
            hoveredBlogIndex === null ||
            !blogsHoverCardRef.current ||
            !blogItemsRef.current ||
            !blogItemsRef.current.children[hoveredBlogIndex]
        ) {
            return;
        }
        // Height of the tech item in the card
        const height = blogItemsRef.current.children[hoveredBlogIndex]?.clientHeight;

        gsap.to(blogsHoverCardRef.current, {
            duration: 0.4,
            height: height,
            ease: 'power4.out',
        });

        const hoveredBlogItemTop = (blogItemsRef.current.children[hoveredBlogIndex] as HTMLElement)
            .offsetTop;

        gsap.to(blogItemsRef.current, {
            duration: 0.4,
            y: -hoveredBlogItemTop,
            ease: 'power4.out',
        });
    }, [hoveredBlogIndex]);

    const onMouseEnter = () => {
        gsap.to(blogsHoverCardRef.current, {
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

        if (!blogsHoverCardRef.current) return;
        gsap.to(blogsHoverCardRef.current, {
            duration: 0.4,
            x: x / 5,
            y: e.clientY - top - blogsHoverCardRef.current.clientHeight / 2,
            rotation,
            ease: 'power4.out',
        });
    };

    const onMouseLeave = () => {
        gsap.to(blogsHoverCardRef.current, {
            duration: 0.4,
            scale: 0,
            ease: 'power4.out',
        });
    };

    const onCardMouseEnter = (index: number) => {
        setHoveredBlogIndex(index);
    };

    return (
        <div className="-mt-4">
            {showResultAmount && query && (
                <p className="text-sm pb-4 text-charade-400">
                    {blogs.length} result{blogs.length === 1 ? '' : 's'} for &quot;{query}&quot;:
                </p>
            )}
            <div
                className="relative border-t border-t-charade-800"
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}>
                {blogs.map((blog, index) => (
                    <Link
                        key={blog.title}
                        href={blog.url}
                        onMouseEnter={() => onCardMouseEnter(index)}
                        className="flex gap-4 justify-between items-center border-b py-4 border-b-charade-800">
                        <h2 className="mb-1 text-lg text-charade-100">{blog.title}</h2>
                        <div className="flex">
                            <time
                                dateTime={blog.publishedAt}
                                className="mb-2 block text-charade-400">
                                {format(parseISO(blog.publishedAt), 'LLLL d, yyyy')}
                            </time>
                        </div>
                    </Link>
                ))}
                <div
                    className="absolute left-1/2 -top-1/4 w-[32rem] h-72 border border-charade-700 bg-charade-900 rounded-2xl overflow-hidden scale-0 pointer-events-none"
                    ref={blogsHoverCardRef}>
                    <div ref={blogItemsRef}>
                        {blogs.map(blog => (
                            <Link
                                href={blog.url}
                                key={blog.title}
                                className="relative block w-[32rem] h-72">
                                <Image
                                    src={'/assets/images/blog/' + blog.thumbnail}
                                    alt={blog.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 flex flex-col gap-2 p-4 items-center justify-center text-center bg-charade-900/90">
                                    <h2 className="text-white">{blog.title}</h2>
                                    <p className="text-sm text-charade-400">{blog.summary}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogList;
