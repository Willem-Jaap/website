import Link from 'next/link';

interface Props {
    url: string;
}

const GithubProject = async ({ url }: Props) => {
    const response = await fetch(url, {
        next: {
            revalidate: 14_400, // 4 hours
        },
    });

    const repository = (await response.json()) as {
        name: string;
        full_name: string;
        url: string;
        html_url: string;
        stargazers_count: number;
        description: string;
        topics?: string[];
        owner: {
            login: string;
            avatar_url: string;
        };
    };

    if (!response.ok) {
        return null;
    }

    return (
        <div className="relative flex flex-col gap-2 border border-charade-700 rounded-2xl p-8 not-prose">
            <div className="flex justify-between items-center gap-4">
                <h3 className="text-lg">
                    <Link
                        href={repository.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline text-charade-100 hover:text-charade-50 flex items-center gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                            className="w-6 h-6 rounded-full"
                        />
                        {repository.full_name}
                    </Link>
                </h3>
                <div className="flex items-center gap-2 text-charade-300">
                    <svg
                        aria-label="star"
                        height="16"
                        viewBox="0 0 16 16"
                        width="16"
                        fill="currentColor">
                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z" />
                    </svg>
                    {repository.stargazers_count}
                </div>
            </div>
            <p className="text-charade-300">{repository.description}</p>
            <div className="flex flex-wrap justify-between">
                <div className="flex flex-wrap items-center gap-2">
                    {repository.topics?.map(tag => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-sm rounded-full text-charade-300 bg-charade-800 border border-charade-600">
                            {tag}
                        </span>
                    ))}
                </div>
                <Link
                    href={repository.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block no-underline text-sm w-fit py-2 px-5 rounded-full text-charade-100 border border-charade-600">
                    Visit on Github
                </Link>
            </div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <span className="absolute block inset-0 bg-[radial-gradient(circle_at_center_top,#2d2c35_20%,#111014_80%)] opacity-20 duration-300 ease-in transition-opacity" />
                <span className="w-24 h-[1px] absolute left-1/2 top-0 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,#545062,transparent)] opacity-100 duration-300 ease-in transition-opacity" />
            </div>
        </div>
    );
};

export default GithubProject;
