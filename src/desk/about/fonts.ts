import { Courier_Prime } from 'next/font/google';

/** Typewriter face for the letter */
export const typewriter = Courier_Prime({
    subsets: ['latin'],
    weight: ['400', '700'],
    // Only readable once zoomed in, so it shouldn't compete with the first paint
    preload: false,
});
