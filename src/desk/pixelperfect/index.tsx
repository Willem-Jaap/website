import EyesCard from '~/desk/pixelperfect/eyes-card';
import Folder from '~/desk/pixelperfect/folder';
import Stickers from '~/desk/pixelperfect/stickers';
import TeamPhoto from '~/desk/pixelperfect/team-photo';
import TencilCard from '~/desk/pixelperfect/tencil-card';
import Region from '~/desk/region';

/** Pixel Perfect: the agency's folder, with its products clipped and taped to it */
const PixelPerfectRegion = () => (
    <Region id="pixelperfect">
        <Folder />
        <Stickers />
        <TencilCard />
        <EyesCard />
        <TeamPhoto />
    </Region>
);

export default PixelPerfectRegion;
