import Link from 'next/link';

const Page = async () => {
    return (
        <div className="m-8">
            <h1 className="font-medium font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
                Hi, I'm <span className="gradient-text">Willem-Jaap</span>
                <br />
                Software Developer
                <br />
                from the Netherlands
            </h1>
            <p className="max-w-md text-lg text-muted-foreground">
                I build elegant, user-centric web experiences with a focus on performance and
                accessibility.
            </p>
        </div>
    );
};

export default Page;
