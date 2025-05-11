export interface Insight {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content?: string;
    publishedAt: string;
    updatedAt?: string;
    tags: string[];
    readingTime: number;
    views: number;
    author?: {
        name: string;
        avatar?: string;
    };
}
