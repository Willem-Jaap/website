import { type Blog } from 'contentlayer/generated';
import Fuse from 'fuse.js';

const search = (query: string, blogs: Blog[]): Blog[] | [] => {
    // Create a more searchable version of the blogs.
    const searchableBlogs = blogs.map(({ _raw, title, body, publishedAt, updatedAt }) => ({
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

    const fuse = new Fuse(searchableBlogs, options);

    const results = fuse.search(query);

    return results.map(result => {
        return blogs.find(blog => blog.title === result.item.title);
    }) as Blog[];
};

export default search;
