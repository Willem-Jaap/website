'use client';

import { type MouseEvent, useEffect, useRef, useState } from 'react';

import type { Blog } from 'contentlayer/generated';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
    blogs: Blog[];
}

const BlogHover = ({ blogs }: Props) => {
    const blogsHoverCardRef = useRef<HTMLDivElement>(null);
    const blogItemsRef = useRef<HTMLDivElement>(null);
    const blogsContainerRef = useRef<HTMLDivElement>(null);
    const viewBlogButtonRef = useRef<HTMLButtonElement>(null);
    const [hoveredBlogIndex, setHoveredBlogIndex] = useState(0);

    const handleCurrentHoveredBlog = (e: MouseEvent) => {
        const { top, height } = e.currentTarget.getBoundingClientRect();

        const currentMouseY = e.clientY - top;
        const blogHeight = height / blogs.length;

        const hoveredBlogIndex = Math.floor(currentMouseY / blogHeight);

        if (hoveredBlogIndex < 0 || hoveredBlogIndex >= blogs.length) return;

        setHoveredBlogIndex(hoveredBlogIndex);
    };

    const onMouseEnter = (e: MouseEvent) => {
        gsap.to(blogsHoverCardRef.current, {
            duration: 0.4,
            scale: 1,
            ease: 'power4.out',
        });

        gsap.to(viewBlogButtonRef.current, {
            duration: 0.4,
            scale: 1,
            x: e.clientX - e.currentTarget.getBoundingClientRect().left - 100,
            y: e.clientY - e.currentTarget.getBoundingClientRect().top - 20,
            ease: 'power4.out',
        });

        handleCurrentHoveredBlog(e);
    };

    const onMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;

        gsap.to(blogsHoverCardRef.current, {
            duration: 0.4,
            x: x / 5,
            y: y / 5,
            ease: 'power2.out',
        });

        gsap.to(viewBlogButtonRef.current, {
            duration: 0.4,
            x: e.clientX - e.currentTarget.getBoundingClientRect().left - 20,
            y: e.clientY - e.currentTarget.getBoundingClientRect().top - 20,
            ease: 'power2.out',
        });

        // If cursor is outside the container, return.
        if (
            e.clientX < Math.floor(left) ||
            e.clientX > Math.floor(left) + Math.floor(width) ||
            e.clientY < Math.floor(top) ||
            e.clientY > Math.floor(top) + Math.floor(height)
        ) {
            onMouseLeave();
            return;
        }

        handleCurrentHoveredBlog(e);
    };

    const onMouseLeave = () => {
        // Reset cards & button.
        gsap.to(blogsHoverCardRef.current, {
            duration: 0.4,
            scale: 0,
            x: 0,
            y: 0,
            ease: 'power2.out',
        });

        gsap.to(viewBlogButtonRef.current, {
            duration: 0.4,
            scale: 0,
            ease: 'power2.out',
        });
    };

    useEffect(() => {
        if (!blogItemsRef.current) return;

        // Translate blog items to the hovered blog index.
        gsap.to(blogItemsRef.current, {
            duration: 0.4,
            y:
                (-hoveredBlogIndex * blogItemsRef.current.getBoundingClientRect().height) /
                blogs.length,
            ease: 'power2.out',
        });
    }, [hoveredBlogIndex]);

    const router = useRouter();

    const onClick = () => {
        router.push(blogs[hoveredBlogIndex].url);
    };

    return (
        <div
            className="absolute inset-0 cursor-pointer"
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            ref={blogsContainerRef}>
            <div
                className="absolute left-1/2 -top-1/4 w-72 h-52 border border-charade-700 bg-charade-900 rounded-2xl overflow-hidden scale-0"
                ref={blogsHoverCardRef}>
                <div ref={blogItemsRef}>
                    {blogs.map(blog => (
                        <Link href={blog.url} key={blog.title} className="relative block w-72 h-52">
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
            <button
                className="absolute inline-flex items-center w-fit py-3 px-3 mb-20 rounded-full border border-charade-700 bg-charade-900 text-charade-400 scale-0 pointer-events-none"
                ref={viewBlogButtonRef}>
                <span className="w-2 h-2 rounded-full bg-charade-400" />
                <span className="ml-2">View blog</span>
            </button>
        </div>
    );
};

export default BlogHover;
