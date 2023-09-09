'use client';

import { type ChangeEvent, useState } from 'react';

import BlogList from '~components/misc/BlogList';

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
            <div className="max-w-6xl mx-auto px-4 py-32">
                <div className="border-b border-b-charade-800">
                    <div className="flex justify-between items-center gap-4 mb-4">
                        <h2 className="text-2xl leading-tight">Blog</h2>
                        <input
                            type="search"
                            onChange={onChange}
                            className="border border-charade-800 placeholder-charade-400 px-4 py-2 rounded-lg bg-charade-900 outline-none w-full max-w-sm"
                            placeholder='Search for "React"'
                            value={query}
                        />
                    </div>
                    <p className="text-charade-400 pb-6">
                        Read more about my mostly technical insights as a webdeveloper where I
                        discuss the latest trends, explore new technologies and share my general
                        development experiences and thoughts. Let&apos;s learn together!
                    </p>
                </div>
                <div className="py-16">
                    <BlogList showResultAmount query={query} />
                </div>
            </div>
        </>
    );
};

export default Page;
