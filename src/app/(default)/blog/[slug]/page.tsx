import { allBlogs } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

const generateStaticParams = () => {
    return allBlogs.map(blog => ({ slug: blog._raw.flattenedPath }));
};

interface MetaDataParams {
    params: {
        slug: string;
    };
}

const generateMetadata = ({ params }: MetaDataParams) => {
    const blog = allBlogs.find(blog => blog._raw.flattenedPath.includes(params.slug));
    if (!blog) throw new Error(`Blog not found for slug: ${params.slug}`);
    return { title: blog.title };
};

interface Props {
    params: {
        slug: string;
    };
}

const Page = ({ params }: Props) => {
    const blog = allBlogs.find(blog => blog._raw.flattenedPath.includes(params.slug));
    if (!blog) throw new Error(`Blog not found for slug: ${params.slug}`);

    const MDXContent = useMDXComponent(blog.body.code);

    return (
        <article className="px-column-1 py-8">
            <h1 className="mb-8 text-3xl">{blog.title}</h1>
            <MDXContent />
        </article>
    );
};

export { generateStaticParams, generateMetadata };
export default Page;
