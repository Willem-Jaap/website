import Image from 'next/image';

const Page = () => {
    return (
        <>
            <div class="-inset-1/4 -skew-x-7 absolute h-[200%] w-[200%] rotate-4 skew-y-2 bg-[radial-gradient(#e5e7eb_1px,transparent_2px)] [background-size:16px_16px]"></div>
            <div className="relative mx-auto mt-32 flex max-w-7xl items-center gap-12">
                <div className="flex flex-[1.3] flex-col gap-6">
                    <h1 className="font-medium font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
                        Hi, I'm{' '}
                        <span className=" animate-text-gradient bg-[300%] bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                            Willem-Jaap
                        </span>
                        <br />a Software Developer
                        <br />
                        building great products
                    </h1>
                    <p className="max-w-md text-lg text-muted-foreground">
                        I build elegant, user-centric platforms with a focus on turning ideas into
                        profitable products.
                    </p>
                </div>
                <div className="-skew-x-7 relative flex-1 rotate-4 skew-y-2 scale-75 lg:scale-100">
                    <div className="-top-16 -right-16 absolute h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
                    <div className="-bottom-8 -left-8 absolute h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

                    <div className="relative ml-auto flex w-3/4 flex-col gap-3 rounded-2xl border border-neutral-200 bg-gradient-to-tr from-neutral-50 to-blue-500/5 p-2 shadow-lg">
                        <Image
                            src="/assets/images/willem-jaap.jpeg"
                            alt="Willem-Jaap"
                            width={800}
                            height={800}
                            priority
                            quality={100}
                            className="aspect-[1/1.2] h-auto w-full rounded-xl object-cover"
                        />
                        <div className="hover:-translate-y-1 hover:-translate-x-1 absolute right-6 bottom-5 z-10 w-full overflow-hidden rounded-md bg-neutral-50 bg-weak p-3 shadow-[0_0_0_1px_#00000033,-4px_8px_8px_0_#00000022] transition duration-300 will-change-transform hover:shadow-[0_0_0_1px_#00000033,-6px_12px_16px_0_#00000022]">
                            <p className="font-medium">Willem-Jaap Klepper</p>
                            <p className="text-neutral-600 text-sm">
                                Founder & Software Developer @ Pixel Perfect
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
