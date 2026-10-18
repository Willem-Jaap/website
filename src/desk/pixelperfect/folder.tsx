import { PixelPerfectMark } from '~/desk/pixelperfect/logos';
import { Placed } from '~/desk/pixelperfect/stationery';
import cn from '~/utils/cn';

import { albertSans } from '~/desk/pixelperfect/fonts';
import styles from '~/desk/pixelperfect/pixelperfect.module.css';

const SERVICES = ['Web apps', 'E-commerce', 'CRM & ERP', 'Dashboards', 'Integrations'];

/** Pixel Perfect's black presentation folder, with a few sheets sticking out */
const Folder = () => (
    <Placed x={1.8} y={1.2} width={20} height={27} rotate={-2.5}>
        {/* Papers inside the folder, peeking out on the right and bottom */}
        <div className="paper absolute inset-0 translate-x-[22px] translate-y-[10px] rotate-[1.2deg] rounded-[4px] shadow-object" />
        <div className="paper absolute inset-0 translate-x-[10px] translate-y-[18px] -rotate-[0.6deg] rounded-[4px]" />

        <div
            className={cn(
                styles.folder,
                albertSans.className,
                'absolute inset-0 flex flex-col p-[80px] text-white',
            )}>
            <div className="flex items-center gap-[28px]">
                <PixelPerfectMark className="size-[96px]" />
                <span className="text-[52px] font-medium tracking-[-0.01em]">Pixel Perfect</span>
            </div>

            <h3 className="mt-[96px] text-[68px] leading-[1.06] font-medium tracking-[-0.025em] text-balance">
                We design, build and run software products.
            </h3>
            <p className="mt-[32px] max-w-[640px] text-[28px] leading-[1.45] text-white/65">
                Our own, and together with the teams we work with. Strategy, design, infrastructure
                and code in one team.
            </p>
            <p className="mt-[28px] max-w-[640px] text-[22px] leading-[1.6] tracking-[0.08em] text-white/45 uppercase">
                {SERVICES.join(' · ')}
            </p>

            <a
                href="https://pixelperfect.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-[40px] self-start text-[30px] font-medium text-[hsl(214,67%,62%)] underline decoration-2 underline-offset-[10px] hover:text-white">
                pixelperfect.agency ↗
            </a>

            <p className="mt-auto max-w-[300px] text-[18px] leading-[1.5] tracking-[0.12em] text-white/35 uppercase">
                Pixel Perfect Agency B.V. · The Netherlands
            </p>
        </div>
    </Placed>
);

export default Folder;
