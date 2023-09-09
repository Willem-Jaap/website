import { defineDocumentType, makeSource } from 'contentlayer/source-files';

const Blog = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: `blog/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        publishedAt: {
            type: 'date',
            required: true,
        },
        updatedAt: {
            type: 'date',
            required: true,
        },
        summary: { type: 'string', required: true },
        tags: {
            type: 'list',
            of: { type: 'string' },
        },
    },
    computedFields: {
        url: { type: 'string', resolve: blog => blog._raw.flattenedPath },
    },
}));

const Thought = defineDocumentType(() => ({
    name: 'Thought',
    filePathPattern: `thoughts/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        name: { type: 'string', required: true },
        position: { type: 'string', required: true },
    },
    computedFields: {
        slug: { type: 'string', resolve: thought => thought._raw.flattenedPath },
    },
}));

export { Blog, Thought };
export default makeSource({
    contentDirPath: 'src/content',
    contentDirInclude: ['blog', 'thoughts'],
    documentTypes: [Blog, Thought],
});
