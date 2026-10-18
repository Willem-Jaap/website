import Image from 'next/image';

import { albertSans, clashGrotesk } from '~/desk/pixelperfect/fonts';
import { EyesMark, PixelPerfectMark, TencilMark } from '~/desk/pixelperfect/logos';
import cn from '~/utils/cn';

const SERVICES = ['Web apps', 'E-commerce', 'CRM & ERP', 'Dashboards', 'Integrations'];

const PP_BLUE = 'hsl(214 67% 51%)';

/** Pixel Perfect's site: black, a faint grid and the brand blue */
export const PixelPerfectScreen = () => (
    <div
        className={cn(albertSans.className, 'absolute inset-0 flex text-white')}
        style={{
            backgroundColor: '#070909',
            backgroundImage:
                'linear-gradient(rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.05) 1px, transparent 1px)',
            backgroundSize: '96px 96px',
        }}>
        <div className="flex w-[56%] flex-col px-[120px] pt-[120px] pb-[130px]">
            <div className="flex items-center gap-[22px]">
                <PixelPerfectMark className="size-[64px]" />
                <span className="text-[40px] font-medium tracking-[-0.01em]">Pixel Perfect</span>
            </div>
            <h3 className="mt-[90px] text-[84px] leading-[1.02] font-medium tracking-[-0.03em] text-balance">
                We design, build and run software products.
            </h3>
            <p className="mt-[36px] max-w-[680px] text-[30px] leading-[1.45] text-white/65">
                Our own, and together with the teams we work with. Strategy, design, infrastructure
                and code in one team.
            </p>
            <ul className="mt-[36px] flex max-w-[720px] flex-wrap gap-[12px]">
                {SERVICES.map(service => (
                    <li
                        key={service}
                        className="rounded-full border-2 border-white/15 px-[20px] py-[8px] text-[22px] text-white/75">
                        {service}
                    </li>
                ))}
            </ul>
            <a
                href="https://pixelperfect.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto self-start rounded-full px-[34px] py-[16px] text-[28px] font-medium text-white transition-opacity hover:opacity-85"
                style={{ backgroundColor: PP_BLUE }}>
                pixelperfect.agency ↗
            </a>
        </div>
        <figure className="relative mt-[120px] mr-[120px] mb-[130px] flex-1 overflow-hidden rounded-[28px] border-2 border-white/10">
            <Image
                src="/assets/pixelperfect/team.webp"
                alt="The Pixel Perfect team leaning on a railing in front of an old factory"
                width={1200}
                height={750}
                unoptimized
                className="size-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-[30px] pt-[60px] pb-[24px] text-[24px] text-white/85">
                The team, Pixel Perfect Agency B.V. · the Netherlands
            </figcaption>
        </figure>
    </div>
);

/** Eyes' site: an off-white page with a green glow, the dashboard front and centre */
export const EyesScreen = () => (
    <div
        className={cn(albertSans.className, 'absolute inset-0 flex flex-col text-[#0d1f19]')}
        style={{
            backgroundColor: '#F7F8F7',
            backgroundImage:
                'radial-gradient(70% 60% at 50% 0%, rgb(26 137 107 / 0.22), transparent 70%)',
        }}>
        <nav className="flex items-center gap-[18px] px-[120px] pt-[96px]">
            <EyesMark className="h-[34px] w-auto text-[#005740]" />
            <span className="text-[38px] font-semibold tracking-[-0.02em]">Eyes</span>
            <span className="ml-[18px] rounded-full bg-[#E1EDE9] px-[16px] py-[6px] text-[20px] text-[#005740]">
                a Pixel Perfect product
            </span>
            <a
                href="https://eyes.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto rounded-full bg-[#005740] px-[30px] py-[14px] text-[24px] font-medium text-white transition-colors hover:bg-[#1A896B]">
                eyes.dev ↗
            </a>
        </nav>
        <div className="mt-[56px] px-[120px] text-center">
            <h3 className="text-[86px] leading-none font-medium tracking-[-0.035em] text-[#005740]">
                Agentic analytics for everyone.
            </h3>
            <p className="mx-auto mt-[24px] max-w-[980px] text-[28px] leading-[1.45] text-[#0d1f19]/70">
                Eyes interprets your product data for you. Track behaviour, monitor performance,
                analyse funnels and ask questions in plain English.
            </p>
        </div>
        <div className="mx-auto mt-[48px] w-[1180px] overflow-hidden rounded-t-[22px] border-2 border-b-0 border-[#E1EDE9] bg-white shadow-[0_-10px_60px_rgb(0_87_64/0.15)]">
            <Image
                src="/assets/pixelperfect/eyes-overview-ask.webp"
                alt="The Eyes overview: visitors, sessions, bounce rate and conversion, with Ask Eyes open"
                width={1600}
                height={1000}
                unoptimized
                className="block h-auto w-full"
            />
        </div>
    </div>
);

/** Tencil's site: near-black, Clash Grotesk and the one command to start */
export const TencilScreen = () => (
    <div
        className={cn(albertSans.className, 'absolute inset-0 flex flex-col text-white')}
        style={{
            backgroundColor: '#0a0e12',
            backgroundImage:
                'radial-gradient(60% 50% at 80% 10%, rgb(59 141 255 / 0.25), transparent 70%)',
        }}>
        <nav className="flex items-center gap-[16px] px-[120px] pt-[96px]">
            <TencilMark cursor="#0a0e12" className="size-[48px] text-[#3b8dff]" />
            <span className={cn(clashGrotesk.className, 'text-[40px] font-semibold')}>Tencil</span>
            <span className="ml-[18px] rounded-full border-2 border-white/15 px-[16px] py-[6px] text-[20px] text-white/60">
                open source · apache-2.0
            </span>
            <div className="ml-auto flex gap-[28px] text-[24px] font-medium">
                <a
                    href="https://github.com/tencildev/tencil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7cd93a] hover:text-white">
                    GitHub ↗
                </a>
                <a
                    href="https://tencil.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3b8dff] hover:text-white">
                    tencil.dev ↗
                </a>
            </div>
        </nav>
        <div className="flex flex-1 items-center gap-[70px] px-[120px] pb-[110px]">
            <div className="w-[640px] shrink-0">
                <h3
                    className={cn(
                        clashGrotesk.className,
                        'text-[92px] leading-[0.98] font-medium tracking-[-0.01em]',
                    )}>
                    Point at your UI. Prompt your agent.
                </h3>
                <p className="mt-[30px] text-[28px] leading-[1.45] text-white/70">
                    Press{' '}
                    <kbd className="rounded-[8px] border-2 border-white/25 px-[10px] font-sans text-[24px]">
                        C
                    </kbd>
                    , click an element, type a change, and your coding agent makes it.
                </p>
                <code className="mt-[40px] inline-flex items-center gap-[18px] rounded-[16px] border-2 border-white/10 bg-white/5 px-[28px] py-[18px] font-mono text-[28px]">
                    <span className="text-white/40">$</span> npx tencil
                </code>
            </div>
            <Image
                src="/assets/pixelperfect/tencil-og.webp"
                alt="Tencil: point at your UI, prompt your agent."
                width={1200}
                height={630}
                unoptimized
                className="h-auto min-w-0 flex-1 rounded-[20px] border-2 border-white/10 shadow-[0_30px_80px_rgb(59_141_255/0.2)]"
            />
        </div>
    </div>
);
