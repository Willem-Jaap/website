import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

const Insight = defineDocumentType(() => ({
    name: 'Insight',
    filePathPattern: `insights/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true }, // In cards and SEO
        summary: { type: 'string', required: true }, // On post detail page
        thumbnail: { type: 'string', required: true },
        publishedAt: {
            type: 'date',
            required: true,
        },
        updatedAt: {
            type: 'date',
            required: true,
        },
        tags: {
            type: 'list',
            of: { type: 'string' },
        },
    },
    computedFields: {
        url: { type: 'string', resolve: insight => '/' + insight._raw.flattenedPath },
        estimatedReadingTime: {
            type: 'string',
            resolve: insight => {
                const wordCount = insight.body.raw.split(' ').length;
                const wordsPerMinute = 200;
                const estimatedReadingTime = Math.ceil(wordCount / wordsPerMinute);

                if (estimatedReadingTime === 1) return `${estimatedReadingTime} minute`;
                return `${estimatedReadingTime} minutes`;
            },
        },
    },
}));

const Project = defineDocumentType(() => ({
    name: 'Project',
    filePathPattern: `projects/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        name: { type: 'string', required: true },
        description: { type: 'string', required: true },
        thumbnail: { type: 'string' },
        tags: {
            type: 'list',
            of: { type: 'string' },
        },
    },
    computedFields: {
        url: { type: 'string', resolve: insight => '/' + insight._raw.flattenedPath },
    },
}));

const Tech = defineDocumentType(() => ({
    name: 'Tech',
    filePathPattern: `tech/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        name: { type: 'string', required: true },
        experience: { type: 'string', required: true },
        position: { type: 'number', required: true },
    },
    computedFields: {
        slug: { type: 'string', resolve: tech => tech._raw.flattenedPath },
    },
}));

export { Insight, Project, Tech };
export default makeSource({
    contentDirPath: 'src/content',
    contentDirInclude: ['insights', 'projects', 'tech'],
    documentTypes: [Insight, Project, Tech],
    mdx: {
        remarkPlugins: [],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ['header-anchor not-prose'],
                    },
                },
            ],
        ],
    },
});
