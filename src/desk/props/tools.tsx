import { CM } from '~/desk/layout';
import Eraser from '~/desk/props/eraser';
import Mug, { CoffeeRing } from '~/desk/props/mug';
import Pencil from '~/desk/props/pencil';
import Ruler from '~/desk/props/ruler';
import Scalpel from '~/desk/props/scalpel';

/** On the desk to the right of the mat, in world units: coffee and the tools of the trade */
const Tools = () => (
    <>
        <CoffeeRing x={148 * CM} y={-11 * CM} />
        <Mug x={150 * CM} y={-3 * CM} />
        <Ruler x={109 * CM} y={22 * CM} rotate={90} />
        <Pencil x={128 * CM} y={46 * CM} rotate={76} />
        <Scalpel x={132 * CM} y={60 * CM} rotate={98} />
        <Eraser x={145 * CM} y={40 * CM} rotate={18} />
    </>
);

export default Tools;
