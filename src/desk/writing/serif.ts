import { Newsreader } from 'next/font/google';

/** The typeface the sheets are printed in */
const serif = Newsreader({
    subsets: ['latin'],
    style: ['normal', 'italic'],
    // Tiny on the desk until zoomed in; on /writing it swaps in once loaded
    preload: false,
});

export default serif;
