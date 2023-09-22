import { type Blog, allBlogs } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

import search from '~app/(default)/blog/utils/search';

const BlogRow = (blog: Blog) => {
    return (
        <Link
            href={blog.url}
            className="flex gap-4 justify-between items-center border-b py-4 border-b-charade-800">
            <h2 className="mb-1 text-lg"> {blog.title}</h2>
            <div className="flex">
                <time dateTime={blog.publishedAt} className="mb-2 block text-xs text-gray-600">
                    {format(parseISO(blog.publishedAt), 'LLLL d, yyyy')}
                </time>
            </div>
        </Link>
    );
};

interface BlogListProps {
    query?: string;
    showResultAmount?: boolean;
}

const BlogList = ({ query, showResultAmount = false }: BlogListProps) => {
    let blogs = allBlogs;

    if (query) {
        blogs = search(query, allBlogs);
    }
    return (
        <div className="-mt-4">
            {showResultAmount && query && (
                <p className="text-sm pb-4 text-charade-400 border-b border-b-charade-800">
                    {blogs.length} result{blogs.length === 1 ? '' : 's'} for &quot;{query}&quot;:
                </p>
            )}
            {blogs.map((blog, idx) => (
                <BlogRow key={idx} {...blog} />
            ))}
        </div>
    );
};

export default BlogList;
