import { allProjects } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import GithubProject from '~projects/components/github-project';

const components = {
    GithubProject: ({ url }: { url: string }) => <GithubProject url={url} />,
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
        <div className="max-w-5xl mx-auto mt-28 px-8 pt-16">
            <div className="mt-8 mb-4 text-charade-400">
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
                <Link href="/projects">Back to projects</Link>
            </div>
            <h1 className="mb-4 text-3xl">{project.name}</h1>
            <p className="mb-8 text-charade-400">{project.description}</p>
            <div className="flex flex-wrap gap-2">
                {project.tags?.map(tag => (
                    <span
                        key={tag}
                        className="bg-charade-800 text-charade-50 border border-charade-700 rounded-full px-4 py-2 text-sm">
                        {tag}
                    </span>
                ))}
            </div>
            <hr className="border-charade-800 my-8" />
            <article className="prose prose-charade prose-headings:text-charade-50 prose-headings:font-normal max-w-none">
                <MDXContent components={components} />
            </article>
        </div>
    );
};

export { generateStaticParams, generateMetadata };
export default Page;
