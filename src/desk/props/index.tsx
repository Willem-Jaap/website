import { CM } from '~/desk/layout';
import Crate from '~/desk/props/crate';
import Sleeve from '~/desk/props/sleeve';
import TrainingCard from '~/desk/props/training-card';
import Turntable from '~/desk/props/turntable';
import WeightPlate from '~/desk/props/weight-plate';
import Region from '~/desk/region';

/** Off the mat on the bare desk: the turntable, the records, and the gym */
const PropsRegion = () => (
    <Region id="props">
        <Turntable x={1 * CM} y={1 * CM} rotate={-1.5} />
        <Crate x={1 * CM} y={43 * CM} rotate={2} />
        <Sleeve x={28 * CM} y={40 * CM} rotate={7} />
        <TrainingCard x={2 * CM} y={82 * CM} rotate={-4} />
        <WeightPlate x={17 * CM} y={86 * CM} rotate={12} />
    </Region>
);

export default PropsRegion;
