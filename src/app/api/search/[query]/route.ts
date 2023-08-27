import { allBlogs } from 'contentlayer/generated';
import Fuse from 'fuse.js';
import { NextResponse } from 'next/server';

interface Props {
    params: {
        query: string;
    };
}

// eslint-disable-next-line @typescript-eslint/require-await
const GET = async (request: Request, { params }: Props) => {
    // Create a more searchable version of the blogs.
    const searchableBlogs = allBlogs.map(({ _raw, title, body, publishedAt, updatedAt }) => ({
        title,
        publishedAt,
        updatedAt,
        body: body.raw,
        slug: _raw.flattenedPath,
    }));

    const options = {
        includeScore: true,
        keys: [
            {
                name: 'title',
                weight: 2,
            },
            {
                // Not implemented yet.
                name: 'tags',
                weight: 1,
            },
            {
                name: 'body',
                weight: 1,
            },
            {
                name: 'slug',
                weight: 1.5,
            },
            {
                name: 'publishedAt',
                weight: 0.5,
            },
            {
                name: 'updatedAt',
                weight: 0.5,
            },
        ],
    };

    const fuse = new Fuse(searchableBlogs, options);

    const result = fuse.search(params.query);

    return NextResponse.json(result);
};

export { GET };
