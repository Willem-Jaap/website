// import { Link } from 'react-router-dom';
import { Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import type { Insight } from '~types/insight';
import cn from '~utils/cn';

interface Props {
    insight: Insight;
    className?: string;
    featured?: boolean;
}

const InsightCard = ({ insight, className, featured = false }: Props) => {
    const { title, excerpt, slug, readingTime, views, tags, publishedAt } = insight;

    return (
        <Link
            href={`/insights/${slug}`}
            className={cn(
                'group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 transition-all hover:border-blue-500/30 hover:shadow-md',
                featured ? 'md:col-span-2' : '',
                className,
            )}
        >
            <div className="flex-grow p-5">
                {tags && tags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                        {tags.slice(0, 2).map(tag => (
                            <span
                                key={tag}
                                className="inline-block rounded-md bg-neutral-100 px-2 py-1 font-medium text-neutral-400 text-xs"
                            >
                                {tag}
                            </span>
                        ))}
                        {tags.length > 2 && (
                            <span className="inline-block rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-400 text-xs">
                                +{tags.length - 2}
                            </span>
                        )}
                    </div>
                )}
                <h3 className="mb-2 font-serif text-neutral-900 text-xl transition-colors group-hover:text-blue-500">
                    {title}
                </h3>
                <p className="mb-2 line-clamp-2 text-neutral-600 text-sm">{excerpt}</p>
            </div>

            <div className="flex items-center justify-between border-neutral-200 border-t p-5 pt-3 text-muted-foreground text-xs">
                <div className="flex items-center gap-4">
                    <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{readingTime} min read</span>
                    </div>
                    <div className="flex items-center">
                        <Eye className="mr-1 h-3 w-3" />
                        <span>{views.toLocaleString()} views</span>
                    </div>
                </div>
                <time dateTime={new Date(publishedAt).toISOString()}>
                    {new Date(publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </time>
            </div>
        </Link>
    );
};

export default InsightCard;
