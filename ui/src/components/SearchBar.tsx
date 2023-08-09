import { useState, ChangeEvent } from 'react';

import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
	value: string;
	onChange: (value: string) => void;
};

export const SearchBar = ({ value = '', onChange }: Props) => {
	const [searchTerm, setSearchTerm] = useState(value);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSearchTerm(value);
		onChange(value);
	};

	return (
		<TextField
			id='search'
			type='search'
			size='small'
			label='Search'
			margin='none'
			value={searchTerm}
			onChange={handleChange}
			InputProps={{
				endAdornment: (
					<InputAdornment position='end'>
						<SearchIcon />
					</InputAdornment>
				),
			}}
			inputProps={{
				'data-testid': 'search-input',
			}}
		/>
	);
};

export default SearchBar;
