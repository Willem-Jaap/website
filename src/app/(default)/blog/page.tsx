'use client';

import { type ChangeEvent, useState } from 'react';

import BlogList from '~components/misc/blog-list';
import PaddedWithRandomized from '~components/misc/padded-with-randomized';

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
            <div className="px-column-1 py-56">
                <div className="pt-24 pb-16 border-b border-b-charade-800">
                    <PaddedWithRandomized text="Blog" />
                </div>
                <div className="flex justify-end items-center gap-4 mt-24 mb-20">
                    <div className="relative h-fit">
                        <input
                            onChange={onChange}
                            className="border border-charade-800 placeholder-charade-400 bg-transparent px-4 py-2 rounded-full outline-none w-full min-w-[24rem] focus:border-charade-500"
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
