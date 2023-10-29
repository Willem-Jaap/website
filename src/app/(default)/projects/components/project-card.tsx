import { type Project } from 'contentlayer/generated';
import Link from 'next/link';

interface Props {
    project: Project;
}

const ProjectCard = ({ project }: Props) => (
    <Link
        href={project.url}
        className="relative w-full p-8 rounded-2xl border border-charade-700 flex flex-col gap-4">
        <h3 className="text-lg">{project.name}</h3>
        <p className="text-charade-400">{project.description}</p>
        <div className="flex flex-wrap gap-2">
            {project.tags?.map(tag => (
                <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full text-charade-300 bg-charade-800 border border-charade-600">
                    {tag}
                </span>
            ))}
        </div>
    </Link>
);

export default ProjectCard;
