import { allBlogs } from 'contentlayer/generated';

const generateStaticParams = () => {
    return allBlogs.map(blog => ({ slug: blog._raw.flattenedPath }));
};

interface MetaDataParams {
    params: {
        slug: string;
    };
}

const generateMetadata = ({ params }: MetaDataParams) => {
    const blog = allBlogs.find(blog => blog._raw.flattenedPath === params.slug);
    if (!blog) throw new Error(`Blog not found for slug: ${params.slug}`);
    return { title: blog.title };
};

interface Props {
    params: {
        slug: string;
    };
}

const Page = ({ params }: Props) => {
    const blog = allBlogs.find(blog => blog._raw.flattenedPath === params.slug);
    if (!blog) throw new Error(`Blog not found for slug: ${params.slug}`);

    return (
        <article className="px-column-1 py-8">
            <h1 className="mb-8 text-3xl">{blog.title}</h1>
            <div className="text-sm" dangerouslySetInnerHTML={{ __html: blog.body.html }} />
        </article>
    );
};

export { generateStaticParams, generateMetadata };
export default Page;
