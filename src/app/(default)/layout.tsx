'use client';

import { type PropsWithChildren, useEffect } from 'react';

import useSettings from '~hooks/useSettings';

import SettingsContext from '../../contexts/settings-context';

const Layout = ({ children }: PropsWithChildren) => {
    const settings = useSettings();

    // Debug mode for checking layout issues, can be enabled in the settings.
    useEffect(() => {
        if (!settings.get('debug')) return document.body.removeAttribute('data-debug');

        document.body.setAttribute('data-debug', 'true');
    }, [settings.get('debug')]);

    return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
};

export default Layout;
