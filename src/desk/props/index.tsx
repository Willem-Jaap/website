import { CM } from '~/desk/layout';
import Eraser from '~/desk/props/eraser';
import Mug, { CoffeeRing } from '~/desk/props/mug';
import Pencil from '~/desk/props/pencil';
import Record from '~/desk/props/record';
import Ruler from '~/desk/props/ruler';
import Scalpel from '~/desk/props/scalpel';
import TrainingCard from '~/desk/props/training-card';
import WeightPlate from '~/desk/props/weight-plate';
import Region from '~/desk/region';

/** Personal things on the desk: music, coffee, the gym and the tools of the cutting mat */
const PropsRegion = () => (
    <Region id="props">
        <CoffeeRing x={23.5 * CM} y={1 * CM} />
        <Record x={0.5 * CM} y={0.5 * CM} />

        <Mug x={23 * CM} y={13.5 * CM} />

        <Scalpel x={1 * CM} y={20.5 * CM} rotate={4} />
        <TrainingCard x={1 * CM} y={22.5 * CM} rotate={-3} />
        <Pencil x={1.5 * CM} y={29.1 * CM} rotate={-4} />
        <Eraser x={13.5 * CM} y={22 * CM} rotate={24} />

        <Ruler x={0.5 * CM} y={30.8 * CM} rotate={-2} />
        <WeightPlate x={18.5 * CM} y={21 * CM} rotate={12} />
    </Region>
);

export default PropsRegion;
