import { EyesMark, TencilMark } from '~/desk/pixelperfect/logos';
import { Placed } from '~/desk/pixelperfect/stationery';
import cn from '~/utils/cn';

import styles from '~/desk/pixelperfect/pixelperfect.module.css';

/** Product stickers stuck on the folder cover */
const Stickers = () => (
    <>
        <Placed x={15} y={3.4} width={3.6} height={3.6} rotate={-12}>
            <div
                className={cn(
                    styles.sticker,
                    'grid size-full place-items-center rounded-full p-[8px]',
                )}>
                <div className="grid size-full place-items-center rounded-full bg-[#005740]">
                    <EyesMark className="w-[62%] text-[#E1EDE9]" />
                </div>
            </div>
        </Placed>
        <Placed x={17.1} y={6.4} width={3} height={3} rotate={9}>
            <div className={cn(styles.sticker, 'size-full rounded-[22px] p-[7px]')}>
                <div className="grid size-full place-items-center rounded-[16px] bg-[#0a0e12]">
                    <TencilMark cursor="#0a0e12" className="w-[70%] text-[#3b8dff]" />
                </div>
            </div>
        </Placed>
    </>
);

export default Stickers;
