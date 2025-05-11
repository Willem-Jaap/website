import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Hero } from '~modules/blocks/hero/hero';
import InsightCard from '~modules/insights/components/insight-card';
import { tempInsights } from '~modules/insights/data';
import cn from '~utils/cn';

const Page = () => {
    return (
        <>
            <Hero />
            <section
                className={cn(
                    'relative overflow-hidden px-4 py-24 md:px-6',
                    'before:absolute before:inset-0 before:z-0 before:bg-gradient-noise before:opacity-10 before:mix-blend-soft-light',
                )}
            >
                <div className="relative z-10 mx-auto max-w-7xl space-y-12">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <h2 className="mb-3 font-serif text-3xl md:text-4xl">
                                Latest Insights
                            </h2>
                            <p className="max-w-lg text-muted-foreground">
                                Thoughts, tutorials, and explorations in software development.
                            </p>
                        </div>
                        <Link
                            href="/insights"
                            className="group inline-flex items-center text-blue-500 transition-colors hover:text-blue-500/90"
                        >
                            View all insights
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {tempInsights.slice(0, 3).map(insight => (
                            <InsightCard key={insight.slug} insight={insight} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Page;
