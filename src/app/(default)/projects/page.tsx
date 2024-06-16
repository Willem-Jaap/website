import PaddedWithRandomized from '~components/misc/padded-with-randomized';
import ProjectsGrid from '~projects/components/projects-grid';
import { type Metadata } from 'next';

const Page = () => {
    return (
        <>
            <div className="mx-column-1 py-56">
                <div className="border-b border-b-charade-800 mb-24">
                    <PaddedWithRandomized text="Projects" />
                    <p className="text-charade-300 my-8 max-w-5xl">
                        I love building things. Here are some of my projects. Some are open source,
                        you can find the code on GitHub. I clarify some of my design decisions in
                        the the post for each project which might be interesting to read.
                    </p>
                </div>
                <ProjectsGrid />
            </div>
        </>
    );
};

export const metadata: Metadata = {
    title: 'Projects',
    description:
        'I love building things. Here are some of my projects. Some are open source, you can find the code on GitHub. I clarify some of my design decisions in the the post for each project which might be interesting to read.',
    openGraph: {
        title: 'Projects',
        description: 'I love building things. Here are some of my projects.',
    },
};

export default Page;
