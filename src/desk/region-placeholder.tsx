import { REGIONS, type RegionId } from '~/desk/layout';

/** Pencilled outline marking where a region's objects will go */
const RegionPlaceholder = ({ id }: { id: RegionId }) => (
    <div className="absolute inset-0 grid place-items-center rounded-[40px] border-[6px] border-dashed border-white/50">
        <p className="font-hand text-[180px] leading-none text-white/80 -rotate-2">
            {REGIONS[id].label}
            <span className="block text-center text-[80px] text-white/60">coming soon</span>
        </p>
    </div>
);

export default RegionPlaceholder;
