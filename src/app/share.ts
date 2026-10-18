import type { Metadata } from 'next';

type OpenGraph = NonNullable<Metadata['openGraph']>;

/** A page's openGraph replaces the layout's instead of merging, so pages spread this in */
export const openGraph = {
    siteName: 'Willem-Jaap',
    locale: 'en_US',
    type: 'website',
} satisfies OpenGraph;

/** The desk from above (src/app/opengraph-image.jpg), for pages without a picture of their own */
export const deskImage = {
    url: '/opengraph-image.jpg',
    width: 1200,
    height: 630,
    alt: "The blue cutting mat on Willem-Jaap's desk, seen from above",
};
