'use client';

import { type ChangeEvent, useState } from 'react';

import BlogList from '~components/misc/blog-list';

interface Props {
    searchParams: Record<string, string | string[] | undefined>;
}

const Page = ({ searchParams }: Props) => {
    const [query, setQuery] = useState((searchParams.q as string | undefined) ?? '');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <>
            <div className="max-w-5xl mx-auto px-8 py-56">
                <div className="border-b border-b-charade-800">
                    <div className="flex justify-between items-center gap-4 mb-4">
                        <h2 className="text-2xl leading-tight">Blog</h2>
                    </div>
                    <p className="text-charade-400 pb-6">
                        Read more about my mostly technical insights as a webdeveloper where I
                        discuss the latest trends, explore new technologies and share my general
                        development experiences and thoughts. Let&apos;s learn together!
                    </p>
                </div>
                <div className="flex justify-end items-center gap-4 py-12 mb-4">
                    <div className="relative w-64 h-fit">
                        <input
                            onChange={onChange}
                            className="border border-charade-800 placeholder-charade-400 px-4 py-2 rounded-full bg-charade-900 outline-none w-full max-w-md"
                            placeholder="Search"
                            value={query}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5 text-charade-400"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </div>
                </div>
                <BlogList showResultAmount query={query} />
            </div>
        </>
    );
};

export default Page;
