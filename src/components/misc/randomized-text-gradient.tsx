import getRandomCharacters from '~utils/get-random-characters';

interface Props {
    lines?: number;
}

const RandomizedTextGradient = ({ lines = 12 }: Props) => {
    return (
        <div className="relative -z-10">
            <div className="absolute left-1/2 w-[calc(100%+20rem)] -mx-40 max-w-[calc(100vw-20rem)] -translate-y-1/4 -translate-x-[calc(50%-10rem)] text-charade-800 text-3xl">
                {Array.from(Array(lines), (_, i) => (
                    <span className="block break-all overflow-hidden h-[1.5em]" key={i}>
                        {getRandomCharacters()}
                    </span>
                ))}
                <div className="absolute inset-0 bg-gradient-radial from-charade-950/30 to-charade-950" />
            </div>
        </div>
    );
};

export default RandomizedTextGradient;
