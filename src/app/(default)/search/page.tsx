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
            <section className="mx-8 pt-6">
                <h2 className="text-2xl leading-tight my-8 pb-6 border-b border-b-charade-800">
                    Search for blogs
                </h2>
                <input
                    type="search"
                    onChange={onChange}
                    className="border border-charade-800 mb-8 px-4 py-2 rounded-lg bg-charade-900 outline-none"
                    placeholder='Search for "React"'
                    value={query}
                />
                <BlogList query={query} />
            </section>
        </>
    );
};

export default Page;
