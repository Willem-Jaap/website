import type { Thought } from 'contentlayer/generated';

interface Props {
    thoughts: Thought[];
}

const ThoughtsSelector = ({ thoughts }: Props) => {
    // Divide the thoughts over 360 degrees so thear are evenly spaced in a circle
    const angle = 360 / thoughts.length;

    return (
        <div className="relative w-[50vw] h-screen">
            <div className="absolute top-1/2 left-1/2 h-0 w-0">
                {thoughts.map((thought, index) => {
                    const transform = `translate(-50%, -50%) rotate(${
                        angle * index
                    }deg) translate(0, 20vh) rotate(-${angle * index}deg)`;

                    return (
                        <div
                            key={thought.slug}
                            className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                            style={{ transform }}>
                            <div className="text-center">
                                <h2 className="text-2xl font-bold">{thought.name}</h2>
                            </div>
                        </div>
                    );
                })}
                <div className="absolute top-0 left-0 transform bg-neutral-800 rounded-full h-4 w-4 -translate-x-1/2 -translate-y-1/2" />
            </div>
        </div>
    );
};

export default ThoughtsSelector;
