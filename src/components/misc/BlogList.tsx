import React from 'react';

import { type Blog } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

const BlogRow = (blog: Blog) => {
    return (
        <Link
            href={blog.url}
            className="flex gap-4 justify-between items-center border-b py-4 border-b-charade-800">
            <h2 className="mb-1 text-xl"> {blog.title}</h2>
            <div className="flex">
                <time dateTime={blog.publishedAt} className="mb-2 block text-xs text-gray-600">
                    {format(parseISO(blog.publishedAt), 'LLLL d, yyyy')}
                </time>
            </div>
        </Link>
    );
};

interface BlogListProps {
    blogs: Blog[];
}

const BlogList = ({ blogs }: BlogListProps) => {
    return (
        <div className="-mt-4">
            {blogs.map((blog, idx) => (
                <BlogRow key={idx} {...blog} />
            ))}
        </div>
    );
};

export default BlogList;
