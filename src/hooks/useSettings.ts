import { useEffect, useState } from 'react';

interface Settings {
    readonly version: number;
    noise?: boolean;
    textRandomization?: boolean;
    debug?: boolean;
}

type UseSettings = ReturnType<typeof useSettings>;

const version = 1.0;
const defaultSettings: Settings = {
    version,
    noise: true,
    textRandomization: true,
    debug: false,
};

const useSettings = () => {
    const [settings, setSettings] = useState<Settings>({} as Settings);

    // Load settings from local storage when the component mounts
    useEffect(() => {
        const storedSettingsJson = localStorage.getItem('settings');

        if (!storedSettingsJson) {
            setSettings(defaultSettings);
            return;
        }

        try {
            const storedSettings = JSON.parse(storedSettingsJson) as Settings | null;
            if (
                !storedSettings ||
                typeof storedSettings !== 'object' ||
                storedSettings.version !== version
            ) {
                setSettings(defaultSettings);
                return;
            }
            setSettings(storedSettings);
        } catch (error) {
            setSettings(defaultSettings);
        }
    }, []);

    // Get all, or a specific setting
    const get = (key?: keyof Settings) => {
        if (key) {
            return settings[key];
        }
        return settings;
    };

    // Update a specific setting
    const set = (key: Exclude<keyof Settings, 'version'>, value: string | number | boolean) => {
        setSettings(prevSettings => {
            const newSettings = {
                ...prevSettings,
                [key]: value,
            };

            localStorage.setItem('settings', JSON.stringify(newSettings));
            return newSettings;
        });
    };

    // Reset all settings to their default values
    const reset = () => {
        localStorage.removeItem('settings');
        setSettings(defaultSettings);
    };

    return {
        get,
        set,
        reset,
        version,
    } as const;
};

export type { Settings, UseSettings };
export default useSettings;
