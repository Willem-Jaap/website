import { createEyes } from 'eyes-next';

type Events = {
    'Region Focus': { region: string; via: 'click' | 'link' | 'keyboard' };
};

const { useEyes, track } = createEyes<Events>();

/**
 * `track` does nothing until the tracker script has loaded, which is too late for an event
 * on the first render (like opening a deep link). Waits up to 10 seconds for it.
 */
const trackRegionFocus = (props: Events['Region Focus']) => {
    let attempts = 0;
    const attempt = () => {
        if ('Eyes' in window) return track('Region Focus', props);
        if (++attempts < 40) setTimeout(attempt, 250);
    };
    attempt();
};

export { useEyes, track, trackRegionFocus };
