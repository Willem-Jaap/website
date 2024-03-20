import { type Insight } from 'contentlayer/generated';
import Fuse from 'fuse.js';

const search = (query: string, insights: Insight[]): Insight[] | [] => {
    // Create a more searchable version of the insights.
    const searchableInsights = insights.map(({ _raw, title, body, publishedAt, updatedAt }) => ({
        title,
        publishedAt,
        updatedAt,
        body: body.raw,
        slug: _raw.flattenedPath,
    }));

    const options = {
        includeScore: true,
        includeMatches: true,
        keys: [
            {
                name: 'title',
                weight: 2,
            },
            {
                name: 'tags',
                weight: 1.5,
            },
            {
                name: 'body',
                weight: 1,
            },
            {
                name: 'slug',
                weight: 1.2,
            },
            {
                name: 'publishedAt',
                weight: 0.3,
            },
            {
                name: 'updatedAt',
                weight: 0.3,
            },
        ],
    };

    const fuse = new Fuse(searchableInsights, options);

    const results = fuse.search(query);

    return results.map(result => {
        return insights.find(insight => insight.title === result.item.title);
    }) as Insight[];
};

export default search;
