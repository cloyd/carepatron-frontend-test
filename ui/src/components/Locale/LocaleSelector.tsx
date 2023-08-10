import { ChangeEvent, memo } from 'react';
import i18n from '@app/util/i18next';

import { useLocaleState } from './useLocale';

const LocaleSelector = () => {
	const locale = useLocaleState();

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		i18n.changeLanguage(event.target.value);
	};

	return (
		<div>
			<select value={locale} onChange={handleChange}>
				<option value='en'>English</option>
				<option value='fil'>Filipino</option>
				<option value='fr'>French</option>
			</select>
		</div>
	);
};

export default memo(LocaleSelector);
