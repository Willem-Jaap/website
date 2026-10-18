import { CM, DESK } from '~/desk/layout';

/** Size of one repeat of the oak texture, in world units (the photo covers about a metre) */
const GRAIN = 96 * CM;

/**
 * The oak desk everything lies on. The texture is a CC0 photo from Poly Haven (oak_veneer_01),
 * with light falling in from the top left and the edges darkening towards the floor.
 */
const Surface = () => (
    <div
        aria-hidden
        className="absolute rounded-[48px]"
        style={{
            left: DESK.x,
            top: DESK.y,
            width: DESK.width,
            height: DESK.height,
            backgroundColor: '#b88a5a',
            backgroundImage: 'url(/assets/desk/oak.jpg)',
            backgroundSize: `${GRAIN}px ${GRAIN}px`,
            boxShadow: [
                // The front edge of the top, then the desk's shadow on the floor
                '0 18px 0 #7a5233',
                '0 22px 0 #5e3d24',
                '0 80px 160px 40px rgb(0 0 0 / 0.55)',
            ].join(','),
        }}>
        {/* Light from a window at the top left, falling off across the desk */}
        <div
            className="absolute inset-0 rounded-[inherit]"
            style={{
                background: [
                    'radial-gradient(120% 90% at 18% 0%, rgb(255 236 200 / 0.22), transparent 60%)',
                    'radial-gradient(140% 120% at 50% 50%, transparent 55%, rgb(40 20 5 / 0.35))',
                ].join(','),
            }}
        />
        {/* A worn, slightly glossy finish along the rounded edge */}
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_3px_0_rgb(255_240_215/0.35),inset_0_0_0_2px_rgb(90_55_25/0.35)]" />
    </div>
);

export default Surface;
