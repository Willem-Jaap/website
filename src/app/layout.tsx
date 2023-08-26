import React from 'react';

import { Inter } from 'next/font/google';

import '~styles/global.css';

interface Props {
    children: React.ReactNode;
}

const InterFont = Inter({
    subsets: ['latin'],
});

const RootLayout = ({ children }: Props) => {
    return (
        <html className={InterFont.className}>
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
