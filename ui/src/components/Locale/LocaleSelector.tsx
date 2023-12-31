import { memo } from 'react';
import i18n from '@app/util/i18next';

import { useLocaleState } from './useLocale';
import Box from '@mui/material/Box/Box';
import FormControl from '@mui/material/FormControl/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select/Select';
import MenuItem from '@mui/material/MenuItem/MenuItem';

const LocaleSelector = () => {
	const locale = useLocaleState();

	const handleChange = (event: SelectChangeEvent<string>) => {
		i18n.changeLanguage(event.target.value);
	};

	return (
		<Box
			sx={{
				m: 1,
				minWidth: 120,
				position: 'fixed',
				bottom: '20px',
				right: '20px',
			}}
		>
			<FormControl fullWidth size='small'>
				<InputLabel id='language-selector'>Language</InputLabel>
				<Select
					labelId='language-selector'
					id='langauge-selector'
					value={locale || 'en'}
					label='Language'
					onChange={handleChange}
				>
					<MenuItem value='en'>English</MenuItem>
					<MenuItem value='fil'>Filipino</MenuItem>
					<MenuItem value='fr'>French</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};

export default memo(LocaleSelector);
