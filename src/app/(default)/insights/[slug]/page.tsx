import { allInsights } from 'contentlayer/generated';
import { format, formatDistance, parseISO } from 'date-fns';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import InsightsList from '~components/misc/insights-list';
import PaddedWithRandomized from '~components/misc/padded-with-randomized';

const generateStaticParams = () => {
    return allInsights.map(insight => ({ slug: insight._raw.sourceFileName.replace('.mdx', '') }));
};

interface MetaDataParams {
    params: {
        slug: string;
    };
}

const generateMetadata = ({ params }: MetaDataParams) => {
    const insight = allInsights.find(
        insight => insight._raw.sourceFileName.replace('.mdx', '') === params.slug,
    );
    if (!insight) throw new Error(`Insight not found for slug: ${params.slug}`);
    return { title: insight.title, description: insight.summary };
};

interface Props {
    params: {
        slug: string;
    };
}

const Page = ({ params }: Props) => {
    const insight = allInsights.find(
        insight => insight._raw.sourceFileName.replace('.mdx', '') === params.slug,
    );
    if (!insight) return notFound();

    const MDXContent = useMDXComponent(insight.body.code);

    return (
        <>
            <article className="max-w-7xl mx-auto mt-48 pt-12 px-8">
                <h1 className="mb-8 text-6xl">{insight.title}</h1>
                <p className="text-charade-200">{insight.summary}</p>
                <div className="flex flex-wrap gap-2 my-8">
                    {insight.tags?.map(tag => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-sm rounded-full text-charade-300 bg-charade-800 border border-charade-600">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex justify-end gap-8 pb-8 mb-12 md:mb-24 border-b border-b-charade-800">
                    <div className="flex flex-col gap-4">
                        <div className="text-charade-400">Date</div>
                        <div className="text-charade">
                            {format(parseISO(insight.publishedAt), 'LLLL d, yyyy')} (
                            {formatDistance(parseISO(insight.publishedAt), new Date(), {
                                addSuffix: true,
                            })}
                            )
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="text-charade-400">Reading time</div>
                        <div>{insight.estimatedReadingTime}</div>
                    </div>
                </div>

                <div className="relative rounded-lg border border-neutral-800 md:aspect-[3/1] aspect-[2/1] h-auto w-full">
                    <Image
                        src={'/assets/images/insights/' + insight.thumbnail}
                        fill
                        alt={insight.title}
                        className="mb-8 object-cover object-left"
                    />
                </div>

                <main className="prose max-w-5xl mx-auto my-12 md:my-24">
                    <MDXContent />
                </main>
            </article>
            <section className="px-column-1 pb-24 border-t border-t-charade-800 bg-charade-900">
                <div className="pt-24 pb-16">
                    <PaddedWithRandomized text="More insights" />
                </div>
                <InsightsList exclude={insight._raw.sourceFileName.replace('.mdx', '')} />
            </section>
        </>
    );
};

export { generateStaticParams, generateMetadata };
export default Page;
