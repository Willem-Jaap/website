import { allThoughts } from 'contentlayer/generated';

import ThoughtsSelector from '~thoughts/components/thoughts-selector';

const Page = () => {
    const toughts = allThoughts.sort((a, b) => {
        return parseInt(a.position) - parseInt(b.position);
    });

    return (
        <div>
            <ThoughtsSelector thoughts={toughts} />
        </div>
    );
};

export default Page;
