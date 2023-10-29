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
    };

    if (!response.ok) {
        return null;
    }

    return (
        <div className="flex flex-col gap-2 bg-charade-900 border border-charade-800 rounded-2xl p-8 not-prose">
            <div className="flex justify-between items-center gap-4">
                <h3 className="text-lg">
                    <Link
                        href={repository.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline text-charade-100 hover:text-charade-50">
                        {repository.full_name}
                    </Link>
                </h3>
                <p>{repository.stargazers_count} stars</p>
            </div>
            <p className="text-charade-400">{repository.description}</p>
            <div className="flex flex-wrap justify-between">
                <div className="flex flex-wrap items-center gap-2">
                    {repository.topics?.map(tag => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs rounded-full text-charade-300 bg-charade-800 border border-charade-600">
                            {tag}
                        </span>
                    ))}
                </div>
                <Link
                    href={repository.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block no-underline text-sm w-fit py-2 px-5 rounded-full text-charade-100 border border-charade-700">
                    Visit on Github
                </Link>
            </div>
        </div>
    );
};

export default GithubProject;
