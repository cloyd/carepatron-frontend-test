import { useContext } from 'react';

import { LocaleContext } from './Provider';

export const useLocaleState = () => {
	const localeState = useContext(LocaleContext);
	if (typeof localeState === 'undefined') {
		throw new Error('useLocaleState must be used within a LocaleProvider');
	}
	return localeState;
};

export default useLocaleState;

export {};
