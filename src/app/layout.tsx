import { Inter } from 'next/font/google';

import '~styles/global.scss';
import cn from '~utils/cn';

interface Props {
    children: React.ReactNode;
}

const InterFont = Inter({
    subsets: ['latin'],
});

const RootLayout = ({ children }: Props) => {
    return (
        <html className={cn(InterFont.className, 'scroll-smooth')}>
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
