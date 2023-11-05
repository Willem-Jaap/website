import { createContext } from 'react';

import { type UseSettings } from '~hooks/useSettings';

const SettingsContext = createContext<UseSettings>({} as UseSettings);

export default SettingsContext;
