import React from 'react';

import Link from 'next/link';

const Page = () => {
    return (
        <div className="page">
            <div className="page__content">
                <h1 className="m-y-1">Hey, I&apos;m Willem-Jaap</h1>
                <p className="t--gray">A Software Developer based in The Netherlands.</p>
                <p className="t--gray">
                    I&apos;m strive to create software that is fast, easy to use, maintainable and
                    scalable.
                    <br />
                    I&apos;m a big fan of Next.js, Typescript, SCSS & Laravel.
                </p>
                <p className="t--gray">
                    I&apos;m currently working at{' '}
                    <Link href="https://pixelperfect.agency" target="_blank" rel="noreferrer">
                        Pixel Perfect Agency
                    </Link>
                    .
                </p>
                <p className="t--gray">
                    You can find me on{' '}
                    <Link href="https://github.com/willem-jaap" target="_blank" rel="noreferrer">
                        Github
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default Page;
