import { createEyes } from 'eyes-next';

type Events = {
    'Insight Search': { query: string; results: number };
    'Project Card Click': { name: string };
    'Setting Changed': { setting: string; value: boolean };
};

const { useEyes, track } = createEyes<Events>();

export { useEyes, track };
