import { Albert_Sans } from 'next/font/google';
import localFont from 'next/font/local';

/** Pixel Perfect's brand typeface */
export const albertSans = Albert_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    // Only readable once zoomed in, so it shouldn't compete with the first paint
    preload: false,
});

/** Tencil's display typeface */
export const clashGrotesk = localFont({
    src: './fonts/ClashGrotesk-Variable.woff2',
    weight: '200 700',
    preload: false,
});
