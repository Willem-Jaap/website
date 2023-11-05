import { allBlogs } from 'contentlayer/generated';
import { format, formatDistance, parseISO } from 'date-fns';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import BlogList from '~components/misc/blog-list';
import PaddedWithRandomized from '~components/misc/padded-with-randomized';

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
    if (!blog) return notFound();

    const MDXContent = useMDXComponent(blog.body.code);

    return (
        <>
            <article className="max-w-7xl mx-auto mt-48 pt-12 px-8">
                <h1 className="mb-8 text-6xl">{blog.title}</h1>
                <p className="text-charade-200">{blog.summary}</p>
                <div className="flex flex-wrap gap-2 my-8">
                    {blog.tags?.map(tag => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-sm rounded-full text-charade-300 bg-charade-800 border border-charade-600">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex justify-end gap-8 pb-8 mb-24 border-b border-b-charade-800">
                    <div className="flex flex-col gap-4">
                        <div className="text-charade-400">Date</div>
                        <div className="text-charade">
                            {format(parseISO(blog.publishedAt), 'LLLL d, yyyy')} (
                            {formatDistance(parseISO(blog.publishedAt), new Date(), {
                                addSuffix: true,
                            })}
                            )
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="text-charade-400">Reading time</div>
                        <div>{blog.estimatedReadingTime}</div>
                    </div>
                </div>

                <div className="relative h-96 overflow-hidden">
                    <Image
                        src={'/assets/images/blog/' + blog.thumbnail}
                        fill
                        alt={blog.title}
                        className="mb-8 object-cover"
                    />
                </div>

                <main className="prose prose-charade prose-headings:text-charade-50 prose-headings:font-normal max-w-5xl mx-auto my-24">
                    <MDXContent />
                </main>
            </article>
            <section className="px-column-1 pb-24 border-t border-t-charade-800 bg-charade-900">
                <div className="pt-24 pb-16">
                    <PaddedWithRandomized text="More blogs" />
                </div>
                <BlogList exclude={blog._raw.sourceFileName.replace('.mdx', '')} />
            </section>
        </>
    );
};

export { generateStaticParams, generateMetadata };
export default Page;
