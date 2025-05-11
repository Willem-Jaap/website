'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '~components/logo';
import cn from '~utils/cn';

const items = [
    { label: 'Home', href: '/' },
    { label: 'Insights', href: '/insights' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
];

const Header = () => {
    const pathname = usePathname();
    return (
        <header className="sticky top-0 z-50 flex justify-between border-neutral-200 border-b bg-neutral-50/80 px-4 py-6 backdrop-blur-md md:px-6">
            <Logo href="/" />
            <nav className="hidden items-center gap-6 md:flex">
                {items.map(item => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            'relative text-base tracking-tight transition-colors hover:text-blue-500',
                            pathname === item.href
                                ? 'font-medium text-blue-500'
                                : 'text-neutral-800/80',
                        )}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </header>
    );
};

export { Header };
