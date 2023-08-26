import React from 'react';

import Link from 'next/link';

const Page = () => {
    return (
        <div className="flex">
            <div className="mx-auto mt-20 mb-8 p-4">
                <h1 className="text-5xl font-semibold mb-4">Hey, I&apos;m Willem-Jaap</h1>
                <p className="text-neutral-500 mb-4">
                    A Software Developer based in The Netherlands.
                </p>
                <p className="text-neutral-500 mb-4">
                    I strive to create software that is fast, easy to use, maintainable and
                    scalable.
                    <br />
                    I&apos;m a big fan of Next.js, Typescript, SCSS & Laravel.
                </p>
                <p className="text-neutral-500 mb-4">
                    I&apos;m currently working at{' '}
                    <Link
                        className="underline"
                        href="https://pixelperfect.agency"
                        target="_blank"
                        rel="noreferrer">
                        Pixel Perfect Agency
                    </Link>
                    .
                </p>
                <p className="text-neutral-500">
                    You can find me on{' '}
                    <Link
                        className="underline"
                        href="https://github.com/willem-jaap"
                        target="_blank"
                        rel="noreferrer">
                        Github
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default Page;
