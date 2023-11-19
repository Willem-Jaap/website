import { allProjects } from 'contentlayer/generated';

import ProjectCard from '~projects/components/project-card';

const ProjectsGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {allProjects.map(project => {
                return <ProjectCard project={project} key={project._id} />;
            })}
        </div>
    );
};

export default ProjectsGrid;
