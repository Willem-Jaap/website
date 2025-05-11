import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="mt-16 border-neutral-200 border-t px-4 py-8 md:px-6">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
                <div className="flex flex-col gap-3">
                    <h3 className="font-medium font-serif text-xl">Willem-Jaap</h3>
                    <p className="max-w-xs text-muted-foreground text-sm">
                        Software Developer based in the Netherlands, focused on creating elegant
                        solutions to complex problems.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="font-medium">Links</h3>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link
                                href="/"
                                className="text-muted-foreground text-sm transition-colors hover:text-blue-500"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/insights"
                                className="text-muted-foreground text-sm transition-colors hover:text-blue-500"
                            >
                                Insights
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/projects"
                                className="text-muted-foreground text-sm transition-colors hover:text-blue-500"
                            >
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className="text-muted-foreground text-sm transition-colors hover:text-blue-500"
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="font-medium">Connect</h3>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground text-sm transition-colors hover:text-blue-500"
                            >
                                Twitter
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground text-sm transition-colors hover:text-blue-500"
                            >
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground text-sm transition-colors hover:text-blue-500"
                            >
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:hello@willemjaap.dev"
                                className="text-muted-foreground text-sm transition-colors hover:text-blue-500"
                            >
                                hello@willemjaap.dev
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between border-neutral-200 border-t pt-6 text-muted-foreground text-sm md:flex-row">
                <p>© {new Date().getFullYear()} Willem-Jaap. All rights reserved.</p>
                <p className="mt-2 md:mt-0">Designed & built with care in the Netherlands</p>
            </div>
        </footer>
    );
};

export default Footer;
