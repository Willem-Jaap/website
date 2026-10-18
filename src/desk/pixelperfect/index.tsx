import { CM } from '~/desk/layout';
import Ipad from '~/desk/pixelperfect/ipad';
import Pencil from '~/desk/pixelperfect/pencil';
import { EyesScreen, PixelPerfectScreen, TencilScreen } from '~/desk/pixelperfect/screens';
import Region from '~/desk/region';

/** Pixel Perfect on an iPad, a screen for the agency and one for each of its products */
const PixelPerfectRegion = () => (
    <Region id="pixelperfect">
        <Ipad
            x={1 * CM}
            y={0.3 * CM}
            rotate={-1.5}
            screens={[
                { label: 'Pixel Perfect', content: <PixelPerfectScreen /> },
                { label: 'Eyes', content: <EyesScreen /> },
                { label: 'Tencil', content: <TencilScreen /> },
            ]}
        />
        <Pencil x={36.6 * CM} y={15 * CM} rotate={86} />
    </Region>
);

export default PixelPerfectRegion;
