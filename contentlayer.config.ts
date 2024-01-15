import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

const Blog = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: `blog/**/*.mdx`,
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
        url: { type: 'string', resolve: blog => '/' + blog._raw.flattenedPath },
        estimatedReadingTime: {
            type: 'string',
            resolve: blog => {
                const wordCount = blog.body.raw.split(' ').length;
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
        url: { type: 'string', resolve: blog => '/' + blog._raw.flattenedPath },
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

export { Blog, Project, Tech };
export default makeSource({
    contentDirPath: 'src/content',
    contentDirInclude: ['blog', 'projects', 'tech'],
    documentTypes: [Blog, Project, Tech],
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
