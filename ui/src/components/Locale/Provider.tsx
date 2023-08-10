import { Dispatch, SetStateAction, createContext, useState } from 'react';

import i18n from '@app/util/i18next';

export const LocaleContext = createContext('en');
export const LocaleDispatchContext = createContext<Dispatch<SetStateAction<string>> | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
	const [locale, setLocale] = useState(i18n.language || 'en');

	i18n.on('languageChanged', (lng) => {
		setLocale(lng);
	});

	return (
		<LocaleContext.Provider value={locale}>
			<LocaleDispatchContext.Provider value={setLocale}>{children}</LocaleDispatchContext.Provider>
		</LocaleContext.Provider>
	);
};

export default LocaleProvider;
