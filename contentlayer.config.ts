import { defineDocumentType, makeSource } from 'contentlayer/source-files';

const Blog = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: `**/*.mdx`,
    fields: {
        title: { type: 'string', required: true },
        date: { type: 'date', required: true },
    },
    computedFields: {
        url: { type: 'string', resolve: blog => `/blog/${blog._raw.flattenedPath}` },
    },
}));

export { Blog };
export default makeSource({ contentDirPath: 'src/content', documentTypes: [Blog] });
