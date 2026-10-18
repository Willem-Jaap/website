import { createEyes } from 'eyes-next';

type Events = {
    'Region Focus': { region: string };
};

const { useEyes, track } = createEyes<Events>();

export { useEyes, track };
