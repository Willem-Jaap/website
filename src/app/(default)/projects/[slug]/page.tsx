import { allProjects } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import Image, { type ImageProps } from 'next/image';
import { notFound } from 'next/navigation';

import GithubProject from '~projects/components/github-project';

const components = {
    GithubProject: ({ url }: { url: string }) => <GithubProject url={url} />,
    Image: (props: ImageProps) => <Image {...props} />,
};

const generateStaticParams = () => {
    return allProjects.map(project => ({ slug: project._raw.sourceFileName.replace('.mdx', '') }));
};

interface MetaDataParams {
    params: {
        slug: string;
    };
}

const generateMetadata = ({ params }: MetaDataParams) => {
    const project = allProjects.find(
        project => project._raw.sourceFileName.replace('.mdx', '') === params.slug,
    );
    if (!project) throw new Error(`Project not found for slug: ${params.slug}`);
    return { name: project.name };
};

interface Props {
    params: {
        slug: string;
    };
}

const Page = ({ params }: Props) => {
    const project = allProjects.find(
        project => project._raw.sourceFileName.replace('.mdx', '') === params.slug,
    );
    if (!project) return notFound();

    const MDXContent = useMDXComponent(project.body.code);

    return (
        <article className="max-w-7xl mx-auto mt-48 pt-12 px-8">
            <h1 className="mb-8 text-6xl">{project.name}</h1>
            <p className="text-charade-200">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-8 mb-12">
                {project.tags?.map(tag => (
                    <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full text-charade-300 bg-charade-800 border border-charade-600">
                        {tag}
                    </span>
                ))}
            </div>
            <hr className="border-charade-800 my-8" />
            <main className="prose prose-charade prose-headings:text-charade-50 prose-headings:font-normal max-w-5xl mx-auto my-24">
                <MDXContent components={components} />
            </main>
        </article>
    );
};

export { generateStaticParams, generateMetadata };
export default Page;
