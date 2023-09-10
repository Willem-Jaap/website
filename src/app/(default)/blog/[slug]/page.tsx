import { allBlogs } from 'contentlayer/generated';
import { format, formatDistance, parseISO } from 'date-fns';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Link from 'next/link';

const generateStaticParams = () => {
    return allBlogs.map(blog => ({ slug: blog._raw.sourceFileName.replace('.mdx', '') }));
};

interface MetaDataParams {
    params: {
        slug: string;
    };
}

const generateMetadata = ({ params }: MetaDataParams) => {
    const blog = allBlogs.find(
        blog => blog._raw.sourceFileName.replace('.mdx', '') === params.slug,
    );
    if (!blog) throw new Error(`Blog not found for slug: ${params.slug}`);
    return { title: blog.title };
};

interface Props {
    params: {
        slug: string;
    };
}

const Page = ({ params }: Props) => {
    const blog = allBlogs.find(
        blog => blog._raw.sourceFileName.replace('.mdx', '') === params.slug,
    );
    if (!blog) throw new Error(`Blog not found for slug: ${params.slug}`);

    const MDXContent = useMDXComponent(blog.body.code);

    return (
        <div className="max-w-6xl mx-auto px-4 py-32">
            <div className="mb-8 text-charade-400">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                <Link href="/blog">Back to blogs</Link>
            </div>

            <h1 className="mb-4 text-3xl">{blog.title}</h1>
            <time dateTime={blog.publishedAt} className="mb-2 block text-sm text-gray-600">
                Published: {format(parseISO(blog.publishedAt), 'LLLL d, yyyy')} (last updated:{' '}
                {formatDistance(parseISO(blog.updatedAt), new Date(), {
                    addSuffix: true,
                })}
                )
            </time>
            <hr className="border-charade-800 my-8" />
            <article className="prose prose-charade prose-headings:text-charade-50 prose-headings:font-normal max-w-none">
                <MDXContent />
            </article>
        </div>
    );
};

export { generateStaticParams, generateMetadata };
export default Page;
