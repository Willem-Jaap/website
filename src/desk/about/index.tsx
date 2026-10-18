import BusinessCard from '~/desk/about/business-card';
import CvCard from '~/desk/about/cv-card';
import Letter from '~/desk/about/letter';
import MatNote from '~/desk/about/mat-note';
import Polaroid from '~/desk/about/polaroid';
import Tape from '~/desk/about/tape';
import { CM } from '~/desk/layout';
import Region from '~/desk/region';

/** Position, size and tilt of an object on the mat, in centimetres */
const place = (x: number, y: number, rotate: number, width?: number, height?: number) => ({
    left: x * CM,
    top: y * CM,
    width: width === undefined ? undefined : width * CM,
    height: height === undefined ? undefined : height * CM,
    rotate: `${rotate}deg`,
});

const AboutRegion = () => (
    <Region id="about">
        <Polaroid
            src="/assets/about/blue-wall.webp"
            alt="Willem-Jaap in a linen shirt against a blue wall"
            width={889}
            height={960}
            photoWidth={9 * CM}
            priority
            style={place(3.2, 16.4, 4)}
        />
        <Polaroid
            src="/assets/about/portrait.webp"
            alt="Willem-Jaap with his arms crossed in front of a concrete wall"
            width={968}
            height={600}
            photoWidth={16 * CM}
            priority
            style={place(0.8, 0.8, -3)}
        />
        <Tape style={place(7, 0.1, -6)} />
        <Tape style={place(6.4, 15.6, 9)} />

        <CvCard style={place(20.6, 1.4, 1.5)} />
        <Tape style={place(19.6, 1.2, -38, 4.4, 1.5)} />

        <Letter style={place(14.6, 15.2, -1.8, 17)} />

        {/* A couple of spares underneath */}
        <div
            aria-hidden
            className="paper absolute rounded-[8px] shadow-[0_1px_1px_rgb(0_0_0/0.2),0_6px_12px_-4px_rgb(0_0_0/0.35)]"
            style={place(31.2, 19.2, 3, 13, 8)}
        />
        <BusinessCard style={place(31, 18.8, -4)} />

        <MatNote style={place(31.6, 27.6, 0)} />
    </Region>
);

export default AboutRegion;
