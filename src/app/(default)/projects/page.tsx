import ProjectsGrid from '~projects/components/projects-grid';

const Page = () => {
    return (
        <>
            <div className="max-w-6xl mx-auto px-8 py-56">
                <div className="border-b border-b-charade-800 mb-12">
                    <div className="flex justify-between items-center gap-4 mb-4">
                        <h2 className="text-2xl leading-tight">Projects</h2>
                    </div>
                    <p className="text-charade-400 pb-6">
                        I love building things. Here are some of my projects. Some are open source,
                        and you can find the code on GitHub. I clarify some of my design decisions
                        in the the post for each project which might be interesting to read.
                    </p>
                </div>
                <ProjectsGrid />
            </div>
        </>
    );
};

export default Page;
