import Image from 'next/image';

import { Placed, Tape } from '~/desk/pixelperfect/stationery';

/** A polaroid of the team, taped onto the folder */
const TeamPhoto = () => (
    <Placed x={11.8} y={21.2} width={10} rotate={4}>
        <figure className="paper shadow-object relative p-[24px] pb-0">
            <Image
                src="/assets/pixelperfect/team.webp"
                alt="The Pixel Perfect team leaning on a railing in front of an old factory"
                width={1200}
                height={750}
                unoptimized
                className="aspect-[16/10] h-auto w-full object-cover saturate-[0.85]"
            />
            <figcaption className="font-hand py-[18px] text-center text-[50px] leading-none text-ink/80">
                the team
            </figcaption>
        </figure>
        <Tape className="-top-[26px] left-1/2 -translate-x-1/2 rotate-[3deg]" />
    </Placed>
);

export default TeamPhoto;
